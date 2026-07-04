import { Component } from '@angular/core';
import { LotteryCardComponent } from '../lottery-card/lottery-card.component';
import { LotteryBannerComponent } from '../lottery-banner/lottery-banner.component';
import { LotteryVideoSectionComponent } from '../lottery-video-section/lottery-video-section.component';

@Component({
  selector: 'app-lottery-section',
  imports: [LotteryCardComponent, LotteryBannerComponent, LotteryVideoSectionComponent],
  templateUrl: './lottery-section.component.html',
  styleUrl: './lottery-section.component.scss',
})
export class LotterySectionComponent {}
