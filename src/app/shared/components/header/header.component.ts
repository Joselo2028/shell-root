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
    this.authService.logout();
  }
}
