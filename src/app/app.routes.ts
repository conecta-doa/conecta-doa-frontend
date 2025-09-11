import { Routes } from '@angular/router';
import { Home } from './components/public-pages/home/home';
import { Login } from './shared/components/login/login';

import { RegisterComponent } from './components/instituition/register/register';


// import { Register } from './components/instituition/register/register';

// import { Register } from './components/donor/register/register';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },

  { path: 'instituition/register', component: RegisterComponent },

  { path: 'instituition/register', component: RegisterComponent },
  // { path: 'donor/register', component: Register },


 // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }

];

