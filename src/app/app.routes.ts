import { Routes } from '@angular/router';

import { Paineldoador } from './components/instituition/paineldoador/paineldoador';
import { InstituicaoComponent } from './components/instituition/instituicoes/instituicao';
import { Login } from './shared/components/login/login';

// ajuste os nomes reais dos arquivos abaixo:
import { Home } from './components/pages/home/home';


export const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: Home },
{ path: 'painel', component: Paineldoador },
{ path: 'instituicao', component: InstituicaoComponent },
{ path: 'login', component: Login },
// { path: 'about', component: SobreNosComponent },

];