import { Component } from '@angular/core';
import { ContributingCardComponent } from '../contributing-card/contributing-card.component';

@Component({
  selector: 'app-contributing',
  imports: [ContributingCardComponent],
  templateUrl: './contributing.component.html',
  styleUrl: './contributing.component.scss',
})
export class ContributingComponent {}
