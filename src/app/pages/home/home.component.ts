import { Component } from '@angular/core';
import { TkHomeDesktopComponent } from '@kindryl/tinka-ui';

import { ContributingComponent } from '@shared/components/contributing/contributing.component';
import { WinnersComponent } from '@shared/components/winners/winners.component';

/**
 * Home page (path: '') — visual landing content (hero + lottery cards,
 * winners, contributing sections). Extracted out of `ShellComponent` so the
 * shell can keep persistent chrome (header/nav/footer) around a
 * `<router-outlet>` and actually navigate to other routes (e.g. `/tinka`,
 * which loads the mfe-tinka remote) instead of always rendering this
 * content regardless of the current route.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TkHomeDesktopComponent, WinnersComponent, ContributingComponent],
  template: `
    <tk-home-desktop></tk-home-desktop>
    <app-winners></app-winners>
    <app-contributing></app-contributing>
  `,
})
export class HomeComponent {}
