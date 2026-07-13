import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { TkHomeDesktopComponent } from '@kindryl/tinka-ui';

import { FooterComponent, HeaderComponent, NavigationComponent } from '@shared/components';

import { ContributingComponent } from '@shared/components/contributing/contributing.component';
import { LoadingOverlayComponent } from '@shared/components/loading-overlay/loading-overlay.component';
import { WinnersComponent } from '@shared/components/winners/winners.component';

@Component({
  selector: 'shell-root',
  imports: [
    HeaderComponent,
    NavigationComponent,
    TkHomeDesktopComponent,
    WinnersComponent,
    ContributingComponent,
    FooterComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly title = signal('shell-root');

  isProcessingLogin = signal(false);
  isLoggingOut = this.authService.isLoggingOut;

  ngOnInit(): void {
    console.log('ShellComponent iniciado');
    console.log('URL actual:', window.location.href);

    const params = new URLSearchParams(window.location.search);
    const pamToken = params.get('pamToken');

    console.log('pamToken recibido:', pamToken);

    if (!pamToken) {
      return;
    }

    this.isProcessingLogin.set(true);

    this.authService.exchangePamToken(pamToken).subscribe({
      next: () => {
        console.log('Exchange PAM OK');
        this.isProcessingLogin.set(false);
        this.router.navigate(['/'], { replaceUrl: true });
      },
      error: (error) => {
        console.error('Error canjeando pamToken', error);
        this.isProcessingLogin.set(false);
        this.router.navigate(['/'], { replaceUrl: true });
      },
    });
  }
}
