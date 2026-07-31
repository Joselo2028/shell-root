import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

import {
  FooterComponent,
  HeaderComponent,
  LotterySectionComponent,
  NavigationComponent,
} from '@shared/components';

import { ContributingComponent } from '@shared/components/contributing/contributing.component';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { WinnersComponent } from '@shared/components/winners/winners.component';

@Component({
  selector: 'shell-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LotterySectionComponent,
    WinnersComponent,
    ContributingComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly title = signal('shell-root');

  readonly isProcessingLogin = signal(false);
  readonly isLoggingOut = this.authService.isLoggingOut;

  ngOnInit(): void {
    console.log('ShellComponent iniciado');
    console.log('URL actual:', window.location.href);

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    console.log('token recibido:', token);

    if (!token) {
      return;
    }

    this.isProcessingLogin.set(true);

    this.authService.exchangePamToken(token).subscribe({
      next: () => {
        console.log('Exchange PAM OK');
        this.isProcessingLogin.set(false);
        this.router.navigate(['/'], { replaceUrl: true });
      },
      error: (error) => {
        console.error('Error canjeando token', error);
        this.isProcessingLogin.set(false);
        this.router.navigate(['/'], { replaceUrl: true });
      },
    });
  }
}
