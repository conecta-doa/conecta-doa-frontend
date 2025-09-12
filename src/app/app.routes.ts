import { Routes } from '@angular/router';
import { Home } from './components/public-pages/home/home';
import { Login } from './shared/components/login/login';

import { RegisterComponent } from './components/instituition/register/register';
import { Register as RegisterDoador } from './components/donor/register/register';
import { Dashboard as DonorDasbboard } from './components/donor/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },

  { path: 'instituition/register', component: RegisterComponent },

  { path: 'donor/register', component: RegisterDoador },
  { path: 'donor/dashboard', component: DonorDasbboard },

  // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }
];
