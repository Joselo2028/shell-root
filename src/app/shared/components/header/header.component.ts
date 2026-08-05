import { Component, inject, signal } from '@angular/core';
import { TkAsideComponent, TkHeaderComponent } from '@kindryl/tinka-ui';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [TkHeaderComponent, TkAsideComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);

  readonly isAsideOpen = signal(false);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly userName = this.authService.userName;

  readonly isStartingLogin = this.authService.isStartingLogin;
  readonly isRedirectingToLegacy = this.authService.isRedirectingToLegacy;

  openAside(): void {
    this.isAsideOpen.set(true);
  }

  closeAside(): void {
    this.isAsideOpen.set(false);
  }

  startLogin(): void {
    this.closeAside();
    this.authService.startPamLogin();
  }

  logout(): void {
    this.closeAside();
    this.authService.logout();
  }

  goToLegacy(): void {
    this.authService.redirectToLegacy();
  }
}
