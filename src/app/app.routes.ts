import { Routes } from '@angular/router';

//public
import { Home } from './components/public-pages/home/home';
import { Login } from './shared/components/login/login';

//donor
import { Paineldoador } from './components/instituition/paineldoador/paineldoador';
import { Register as RegisterDoador } from './components/donor/register/register';
import { Dashboard as DonorDasbboard } from './components/donor/dashboard/dashboard';

//instituition
import { InstituicaoComponent } from './components/instituition/instituicoes/instituicao';
import { RegisterComponent } from './components/instituition/register/register';


export const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: Home },
{ path: 'painel', component: Paineldoador },
{ path: 'instituicao', component: InstituicaoComponent },
{ path: 'login', component: Login },
{ path: 'donor/register', component: RegisterDoador },
{ path: 'donor/dashboard', component: DonorDasbboard },
{ path: 'instituition/register', component: RegisterComponent },
  // { path: 'about', component: SobreNosComponent },
  // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }
];

