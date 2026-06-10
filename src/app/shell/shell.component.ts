import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, } from '@angular/router';

@Component({
  selector: 'shell-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  protected readonly title = signal('shell-root');
}
