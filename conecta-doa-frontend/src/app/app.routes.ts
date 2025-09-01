import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  // { path: 'about', component: AboutComponent },
  // { path: '**', component: NotFoundComponent }
];
