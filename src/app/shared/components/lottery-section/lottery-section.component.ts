import { Component } from '@angular/core';
import { LotteryCardComponent } from '../lottery-card/lottery-card.component';

@Component({
  selector: 'app-lottery-section',
  imports: [LotteryCardComponent],
  templateUrl: './lottery-section.component.html',
  styleUrl: './lottery-section.component.scss',
})
export class LotterySectionComponent {}
