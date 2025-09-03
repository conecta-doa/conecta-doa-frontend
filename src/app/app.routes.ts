import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Login } from './shared/components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },

  // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }
];
