import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, finalize, throwError, map } from 'rxjs';

import {
  AuthSession,
  AuthRefreshResponse,
  BackfrontLoginRequest,
  BackfrontLoginResponse,
  LogoutRequest,
  PamFastTokenResponse,
  PamTokenExchangeRequest,
  RefreshRequest,
} from './auth.models';
import { AuthStorageService } from './auth-storage.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authStorage = inject(AuthStorageService);

  private readonly authBaseUrl = environment.auth.authBaseUrl;
  private readonly pamBaseUrl = environment.auth.pamBaseUrl;

  private readonly pamFastTokenUrl = `${this.authBaseUrl}${environment.auth.pamFastTokenPath}`;
  private readonly pamTokenExchangeUrl = `${this.authBaseUrl}${environment.auth.pamTokenExchangePath}`;
  private readonly backfrontLoginUrl = `${this.pamBaseUrl}${environment.auth.backfrontLoginPath}`;
  private readonly refreshUrl = `${this.authBaseUrl}${environment.auth.refreshPath}`;
  private readonly logoutUrl = `${this.authBaseUrl}${environment.auth.logoutPath}`;

  private readonly session = signal<AuthSession | null>(this.authStorage.getSession());

  readonly isLoggedIn = computed(() => this.session() !== null);
  readonly currentUser = computed(() => this.session()?.user ?? null);
  readonly userName = computed(() => this.session()?.user.name ?? '');
  readonly isStartingLogin = signal(false);
  readonly isLoggingOut = signal(false);

  getAccessToken(): string | null {
    return this.session()?.accessToken ?? null;
  }

  startPamLogin(): void {
    this.isStartingLogin.set(true);

    this.getPamFastToken()
      .pipe(finalize(() => this.isStartingLogin.set(false)))
      .subscribe({
        next: (response) => {
          console.log('Respuesta PAM:', response);

          if (response.redirect) {
            // TODO: Para producción volver a usar window.location.href
            // window.location.href = response.redirect;
            window.open(response.redirect, '_blank', 'noopener,noreferrer');
          }
        },
        error: (error) => {
          console.error('Error iniciando login PAM', error);
        },
      });
  }

  getPamFastToken(): Observable<PamFastTokenResponse> {
    return this.http.get<PamFastTokenResponse>(this.pamFastTokenUrl);
  }

  loginBackfront(request: BackfrontLoginRequest): Observable<BackfrontLoginResponse> {
    return this.http.post<BackfrontLoginResponse>(this.backfrontLoginUrl, request);
  }

  loginBackfrontAndExchange(request: BackfrontLoginRequest): Observable<AuthSession> {
    return this.loginBackfront(request).pipe(
      tap((response) => console.log('Login Backfront OK:', response)),
      switchMap((response) => this.exchangePamToken(response.token)),
    );
  }

  exchangePamToken(securityToken: string): Observable<AuthSession> {
    const body: PamTokenExchangeRequest = { securityToken };

    return this.http
      .post<AuthSession>(this.pamTokenExchangeUrl, body)
      .pipe(tap((session) => this.setSession(session)));
  }

  refreshSession(): Observable<AuthSession> {
    const currentSession = this.session();

    if (!currentSession) {
      return throwError(() => new Error('No existe sesión para refrescar'));
    }

    const body: RefreshRequest = {
      refreshToken: currentSession.refreshToken,
      username: currentSession.user.clientId,
    };

    return this.http.post<AuthRefreshResponse>(this.refreshUrl, body).pipe(
      map((refreshResponse) => {
        const updatedSession: AuthSession = {
          ...currentSession,
          accessToken: refreshResponse.accessToken,
          refreshToken: refreshResponse.refreshToken,
          idToken: refreshResponse.idToken,
          tokenType: refreshResponse.tokenType,
          expiresIn: refreshResponse.expiresIn,
        };

        this.setSession(updatedSession);
        return updatedSession;
      }),
    );
  }

  logout(): void {
    const currentSession = this.session();

    if (!currentSession) {
      this.clearSession();
      return;
    }

    this.isLoggingOut.set(true);

    const body: LogoutRequest = {
      refreshToken: currentSession.refreshToken,
    };

    this.http
      .post<void>(this.logoutUrl, body)
      .pipe(
        finalize(() => {
          this.clearSession();
          this.isLoggingOut.set(false);
        }),
      )
      .subscribe({
        next: () => console.log('Logout backend OK'),
        error: (error) => console.error('Error ejecutando logout backend', error),
      });
  }

  clearSession(): void {
    this.authStorage.clearSession();
    this.session.set(null);
  }

  private setSession(session: AuthSession): void {
    this.authStorage.saveSession(session);
    this.session.set(session);
  }
}
