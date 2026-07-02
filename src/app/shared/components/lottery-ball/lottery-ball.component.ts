import { Component, input } from '@angular/core';

@Component({
  selector: 'app-lottery-ball',
  templateUrl: './lottery-ball.component.html',
  styleUrls: ['./lottery-ball.component.scss'],
})
export class LotteryBallComponent {
  readonly number = input.required<number | string>();

  readonly variant = input<'white' | 'green' | 'yellow' | 'blue' | 'orange' | 'purple'>('white');
}
