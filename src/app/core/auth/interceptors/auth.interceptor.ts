import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  const isAuthRequest =
    request.url.includes('/auth/login') ||
    request.url.includes('/auth/refresh') ||
    request.url.includes('/auth/logout') ||
    request.url.includes('/auth/pam/token/exchange') ||
    request.url.includes('/auth/pam/token/fast') ||
    request.url.includes('/backfront-identity/api/v1/identity/login');

  const accessToken = authService.getAccessToken();

  const requestWithToken =
    accessToken && !isAuthRequest
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : request;

  return next(requestWithToken).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthRequest) {
        return throwError(() => error);
      }

      return authService.refreshSession().pipe(
        switchMap((updatedSession) => {
          const retryRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${updatedSession.accessToken}`,
            },
          });

          return next(retryRequest);
        }),
        catchError((refreshError) => {
          authService.clearSession();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
