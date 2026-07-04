import { Component, input } from '@angular/core';

@Component({
  selector: 'app-winner-card',
  templateUrl: './winner-card.component.html',
  styleUrl: './winner-card.component.scss',
})
export class WinnerCardComponent {
  readonly variant = input<'kabala' | 'tinka' | 'ganadiario'>('kabala');

  readonly lottery = input.required<string>();

  readonly winnerName = input.required<string>();

  readonly prize = input.required<string>();

  readonly city = input.required<string>();
}
