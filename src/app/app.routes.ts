import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { InstituicaoComponent } from './components/donor/Instituicoes/instituicao.component';


export const routes: Routes = [
  {
    path: '', loadChildren: () => import('./components/public-pages/public-pages.module')
      .then(m => m.PublicPagesModule)
  },
  { path: 'login', component: LoginComponent },

  { path: 'instituicao', component: InstituicaoComponent  },
  {
    path: 'donor', loadChildren: () => import('./components/donor/donor.module')
      .then(r => r.DonorModule)
  },
  {
    path: 'instituition', loadChildren: () => import('./components/instituition/instituition.module')
      .then(r => r.InstituitionModule)
  }
  // { path: 'about', component: SobreNosComponent },
  // { path: 'about', component: SobreNosComponent },
  // { path: '**', component: NotFoundComponent }
];
