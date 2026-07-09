import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-user-session',
  imports: [],
  templateUrl: './user-session.component.html',
  styleUrl: './user-session.component.scss',
})
export class UserSessionComponent {
  userName = input<string>('Usuario');
  logout = output<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
