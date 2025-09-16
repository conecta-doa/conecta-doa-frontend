import { Routes } from '@angular/router';
import { Home } from './components/public-pages/home/home';
import { Login } from './shared/components/login/login';

import { RegisterComponent } from './components/instituition/register/register';
import { Register as RegisterDoador } from './components/donor/register/register';
import { Paineldoador } from './components/instituition/paineldoador/paineldoador';
import { instituicao } from './components/instituition/instituicoes/instituicao';
// import { Dashboard as DonorDasbboard } from './components/donor/dashboard/dashboard';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'Paineldoador', component: Paineldoador },
  { path: 'instituicao', component: instituicao },
  { path: 'instituition/register', component: RegisterComponent },


  { path: 'donor/register', component: RegisterDoador },
  // { path: 'donor/dashboard', component: DonorDasbboard },


 // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }

];

