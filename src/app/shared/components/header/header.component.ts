import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { HamburgerButtonComponent } from '../hamburger-button/hamburger-button.component';
import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, HamburgerButtonComponent, MobileSidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMobileMenuOpen = signal(false);
  isLoggedIn = signal(false);

  openMobileMenu(): void {
    this.isMobileMenuOpen.set(true);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
