import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/public-pages/public-pages.module')
        .then((m) => m.PublicPagesModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'instituicoes',
    loadChildren: () =>
      import('./components/public-pages/public-pages.module')
        .then((m) => m.PublicPagesModule),
  },
  {
    path: 'donor',
    loadChildren: () =>
      import('./components/donor/donor.module')
        .then((r) => r.DonorModule),
  },
  {
    path: 'instituicao',
    loadChildren: () =>
      import('./components/instituition/instituition.module')
        .then((r) => r.InstituitionModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
