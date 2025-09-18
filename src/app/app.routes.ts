import { Routes } from '@angular/router';

//public
import { Home } from './components/public-pages/home/home';
import { Login } from './shared/components/login/login';

//donor
import { RegisterDonor } from './components/donor/register/register';
import { DashboardDonor } from './components/donor/dashboard/dashboard';

//instituition
import { Paineldoador } from './components/instituition/paineldoador/paineldoador';
import { InstituicaoComponent } from './components/instituition/instituicoes/instituicao';
import { RegisterInstitution } from './components/instituition/register/register';
import { DashboardInstituition } from './components/instituition/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'painel', component: Paineldoador },
  { path: 'instituicao', component: InstituicaoComponent }, 
  { path: 'login', component: Login },
  { path: 'donor/register', component: RegisterDonor },
  { path: 'donor/dashboard', component: DashboardDonor },
  { path: 'instituition/register', component: RegisterInstitution },
  { path: 'instituition/dashboard', component: DashboardInstituition }, //não está funcionando (ventura)
  // { path: 'about', component: SobreNosComponent },
  // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }
];
