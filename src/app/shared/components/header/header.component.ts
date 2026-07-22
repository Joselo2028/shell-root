import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';
import { UserSessionComponent } from '../user-session/user-session.component';
import { AuthService } from '../../../core/auth/auth.service';
import { HamburgerButtonComponent } from '../hamburger-button/hamburger-button.component';
@Component({
  selector: 'app-header',
  imports: [
    ButtonComponent,
    HamburgerButtonComponent,
    MobileSidebarComponent,
    UserSessionComponent,
  ],
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
