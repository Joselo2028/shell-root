import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-mobile-sidebar',
  imports: [],
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
