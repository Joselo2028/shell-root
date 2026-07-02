import { Component, input } from '@angular/core';

@Component({
  selector: 'app-lottery-badge',
  templateUrl: './lottery-badge.component.html',
  styleUrls: ['./lottery-badge.component.scss'],
})
export class LotteryBadgeComponent {
  readonly icon = input<string>();

  readonly text = input.required<string>();

  readonly variant = input<
    'default' | 'card' | 'card-light' | 'result' | 'result-hero' | 'result-purple'
  >('default');
}
