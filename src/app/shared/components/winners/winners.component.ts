import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { WinnerCardComponent } from '../winner-card/winner-card.component';

@Component({
  selector: 'app-winners',
  imports: [ButtonComponent, WinnerCardComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
})
export class WinnersComponent {}
