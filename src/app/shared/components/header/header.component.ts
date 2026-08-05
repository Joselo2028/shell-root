import { Component, inject, signal } from '@angular/core';
import { TkHeaderComponent } from '@kindryl/tinka-ui';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [TkHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);

  isMobileMenuOpen = signal(false);

  isLoggedIn = this.authService.isLoggedIn;
  userName = this.authService.userName;

  isStartingLogin = this.authService.isStartingLogin;
  isRedirectingToLegacy = this.authService.isRedirectingToLegacy;

  openMobileMenu(): void {
    this.isMobileMenuOpen.set(true);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  startLogin(): void {
    this.authService.startPamLogin();
  }

  logout(): void {
    console.log('Entró al logout del HeaderComponent');
    this.authService.logout();
  }

  goToLegacy(): void {
    this.authService.redirectToLegacy();
  }
}
