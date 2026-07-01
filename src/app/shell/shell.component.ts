import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FooterComponent,
  HeaderComponent,
  NavigationComponent,
  PromoBannerComponent,
} from '@shared/components';

@Component({
  selector: 'shell-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    PromoBannerComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  protected readonly title = signal('shell-root');
}
