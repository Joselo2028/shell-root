import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contributing-card',
  imports: [],
  templateUrl: './contributing-card.component.html',
  styleUrl: './contributing-card.component.scss',
})
export class ContributingCardComponent {
  readonly title = input.required<string>();

  readonly description = input.required<string>();

  readonly linkLabel = input<string>('Conocer más');

  readonly variant = input<'default' | 'first' | 'last'>('default');
}
