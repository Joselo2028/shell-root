import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { environment } from '../environments/environment';
import { LotterySectionComponent } from '@shared/components';

export const routes: Routes = [
  {
    path: '',
    component: LotterySectionComponent,
  },
  {
    path: 'jugar/kabala',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.kabala,
        exposedModule: './Routes',
      }).then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
