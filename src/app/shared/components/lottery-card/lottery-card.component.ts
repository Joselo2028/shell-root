import { Component, input } from '@angular/core';
import { LotteryBadgeComponent } from '../lottery-badge/lottery-badge.component';
import { ButtonComponent } from '../button/button.component';
import { LotteryBallComponent } from '../lottery-ball/lottery-ball.component';

@Component({
  selector: 'app-lottery-card',
  templateUrl: './lottery-card.component.html',
  styleUrls: ['./lottery-card.component.scss'],
  imports: [LotteryBadgeComponent, ButtonComponent, LotteryBallComponent],
})
export class LotteryCardComponent {
  readonly variant = input<'default' | 'hero'>('default');
}
