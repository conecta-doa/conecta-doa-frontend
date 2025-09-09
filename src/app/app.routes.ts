import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Login } from './shared/components/login/login';
import { Register } from './components/instituition/register/register';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'instituition/register', component: Register },

  // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }
];
