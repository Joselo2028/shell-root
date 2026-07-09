import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';

import {
  AuthSession,
  BackfrontLoginRequest,
  BackfrontLoginResponse,
  PamFastTokenResponse,
  PamTokenExchangeRequest,
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

  private readonly session = signal<AuthSession | null>(this.authStorage.getSession());

  readonly isLoggedIn = computed(() => this.session() !== null);
  readonly currentUser = computed(() => this.session()?.user ?? null);
  readonly userName = computed(() => this.session()?.user.name ?? '');
  readonly isStartingLogin = signal(false);

  startPamLogin(): void {
    this.isStartingLogin.set(true);

    this.getPamFastToken().subscribe({
      next: (response) => {
        console.log('Respuesta PAM:', response);

        if (response.redirect) {
          // Redirección dinámica devuelta por backend/PAM. No va en environment.
          // window.location.href = response.redirect;
          window.open(response.redirect, '_blank', 'noopener,noreferrer');
        }

        this.isStartingLogin.set(false);
      },
      error: (error) => {
        console.error('Error iniciando login PAM', error);
        this.isStartingLogin.set(false);
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
      tap((response) => {
        console.log('Login Backfront OK:', response);
      }),
      switchMap((response) => this.exchangePamToken(response.token)),
    );
  }

  exchangePamToken(securityToken: string): Observable<AuthSession> {
    const body: PamTokenExchangeRequest = {
      securityToken,
    };

    return this.http.post<AuthSession>(this.pamTokenExchangeUrl, body).pipe(
      tap((session) => {
        this.setSession(session);
      }),
    );
  }

  logout(): void {
    this.authStorage.clearSession();
    this.session.set(null);
  }

  private setSession(session: AuthSession): void {
    this.authStorage.saveSession(session);
    this.session.set(session);
  }
}
