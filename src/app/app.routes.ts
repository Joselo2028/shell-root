import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'tinka',
    // mfe-tinka exposes './Component' -> RemoteComponent (see mfe-tinka's
    // webpack.config.js / AGENTS.md), not './Tinka' -> TinkaComponent like
    // the other (not-yet-built) game MFEs below. RemoteComponent is a thin
    // host with its own internal <router-outlet>, which needs a matching
    // child route here (loading './Juego' -> JuegoComponent) to actually
    // render content — Module Federation's loadComponent doesn't carry over
    // mfe-tinka's own `provideRouter(routes)`.
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.tinka,
        exposedModule: './Component',
      }).then((m) => m.RemoteComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: environment.remotes.tinka,
            exposedModule: './Juego',
          }).then((m) => m.JuegoComponent),
      },
    ],
  },

  /*  {
    path: 'auth',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.auth,
        exposedModule: './Auth',
      }).then((m) => m.AuthComponent),
  },

  {
    path: 'user',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.user,
        exposedModule: './User',
      }).then((m) => m.UserComponent),
  },

  {
    path: 'wallet',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.wallet,
        exposedModule: './Wallet',
      }).then((m) => m.WalletComponent),
  },

  {
    path: 'recharges',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.recharges,
        exposedModule: './Recharges',
      }).then((m) => m.RechargesComponent),
  },

  {
    path: 'notifications',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.notifications,
        exposedModule: './Notifications',
      }).then((m) => m.NotificationsComponent),
  },

  {
    path: 'support',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.support,
        exposedModule: './Support',
      }).then((m) => m.SupportComponent),
  },

  {
    path: 'kabala',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.kabala,
        exposedModule: './Kabala',
      }).then((m) => m.KabalaComponent),
  },

  {
    path: 'ganadiario',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.ganadiario,
        exposedModule: './Ganadiario',
      }).then((m) => m.GanadiarioComponent),
  },

  {
    path: 'ganagol',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.ganagol,
        exposedModule: './Ganagol',
      }).then((m) => m.GanagolComponent),
  },

  {
    path: 'kinelo',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.kinelo,
        exposedModule: './Kinelo',
      }).then((m) => m.KineloComponent),
  },

  {
    path: 'videoloterias',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.videoloterias,
        exposedModule: './Videoloterias',
      }).then((m) => m.VideoloteriasComponent),
  }, */

  {
    path: '**',
    redirectTo: '',
  },
];
