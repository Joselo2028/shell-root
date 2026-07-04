import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FooterComponent,
  HeaderComponent,
  LotterySectionComponent,
  NavigationComponent,
  PromoBannerComponent,
  PromotionsComponent,
} from '@shared/components';
import { ContributingComponent } from '@shared/components/contributing/contributing.component';
import { WinnersComponent } from '@shared/components/winners/winners.component';

@Component({
  selector: 'shell-root',
  imports: [
    //RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    PromoBannerComponent,
    LotterySectionComponent,
    PromotionsComponent,
    WinnersComponent,
    ContributingComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  protected readonly title = signal('shell-root');
}
