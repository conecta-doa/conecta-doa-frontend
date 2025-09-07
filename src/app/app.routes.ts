import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Paineldoador } from './components/instituition/paineldoador/paineldoador';
import { InstituicaoComponent } from './components/instituition/instituicoes/instituicao';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'painel', component: Paineldoador },
  { path: 'instituicao', component: InstituicaoComponent },

  // { path: 'about', component: AboutComponent },
  // { path: '**', component: NotFoundComponent }
];
