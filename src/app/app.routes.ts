import { Routes } from '@angular/router';
import { Home } from './components/public-pages/home/home';
import { LoginComponent } from './shared/components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: LoginComponent },
  {
    path: 'donor', loadChildren: () => import('./components/donor/donor.module')
      .then(r => r.DonorModule)
  },
  {
    path: 'instituition', loadChildren: () => import('./components/instituition/instituition.module')
      .then(r => r.InstituitionModule)
  }
  // { path: 'about', component: SobreNosComponent },
  // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }
];
