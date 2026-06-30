import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TkFooterComponent, TkHeaderComponent } from '@kindryl/tinka-ui';
import {
  NavigationComponent,
  PromoBannerComponent,
} from '../shared/components';

@Component({
  selector: 'shell-root',
  imports: [
    RouterOutlet,
    TkHeaderComponent,
    TkFooterComponent,
    NavigationComponent,
    PromoBannerComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  protected readonly title = signal('shell-root');

  headerLinks = [
    { label: 'Loterias', href: '#' },
    { label: 'Promociones', href: '#' },
    { label: 'Ganadores', href: '#' },
  ];

  footerPaymentLogos = [
    { src: '/assets/images/visa.svg', alt: 'Visa', className: 'h-7 w-auto' },
    { src: '/assets/images/mastercard.svg', alt: 'Mastercard', className: 'h-7 w-auto' },
    { src: '/assets/images/yape.svg', alt: 'Yape', className: 'h-7 w-auto' },
    { src: '/assets/images/plin.svg', alt: 'Plin', className: 'h-7 w-auto' },
    { src: '/assets/images/bcp.svg', alt: 'BCP', className: 'h-7 w-auto' },
    { src: '/assets/images/interbank.svg', alt: 'Interbank', className: 'h-7 w-auto' },
    { src: '/assets/images/pagoefectivo.svg', alt: 'PagoEfectivo', className: 'h-7 w-auto' },
    { src: '/assets/images/bbva.svg', alt: 'BBVA', className: 'h-7 w-auto' },
    { src: '/assets/images/tupay.svg', alt: 'Tupay', className: 'h-7 w-auto' },
    { src: '/assets/images/sip.svg', alt: 'SIP', className: 'h-7 w-auto' },
  ];
}
