import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-lottery-banner',
  imports: [ButtonComponent],
  templateUrl: './lottery-banner.component.html',
  styleUrl: './lottery-banner.component.scss',
})
export class LotteryBannerComponent {}
