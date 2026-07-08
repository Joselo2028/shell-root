import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-mobile-sidebar',
  imports: [ButtonComponent],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.scss',
})
export class MobileSidebarComponent {
  isOpen = input(false);
  isLoggedIn = input(false);

  closeSidebar = output<void>();

  close(): void {
    this.closeSidebar.emit();
  }
}
