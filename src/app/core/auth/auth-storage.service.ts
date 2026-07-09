import { Injectable } from '@angular/core';
import { AuthSession } from './auth.models';

const SESSION_KEY = 'auth-session';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  saveSession(session: AuthSession): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  getSession(): AuthSession | null {
    const session = localStorage.getItem(SESSION_KEY);

    if (!session) {
      return null;
    }

    return JSON.parse(session) as AuthSession;
  }

  clearSession(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  hasSession(): boolean {
    return this.getSession() !== null;
  }

  getAccessToken(): string | null {
    return this.getSession()?.accessToken ?? null;
  }

  getRefreshToken(): string | null {
    return this.getSession()?.refreshToken ?? null;
  }

  getUserName(): string | null {
    return this.getSession()?.user.name ?? null;
  }
}
