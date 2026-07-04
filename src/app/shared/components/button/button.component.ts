import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly label = input.required<string>();

  readonly variant = input<'primary' | 'secondary' | 'danger' | 'outline'>('primary');

  readonly type = input<'button' | 'submit'>('button');

  readonly disabled = input(false);
}
