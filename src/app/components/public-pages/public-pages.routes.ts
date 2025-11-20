import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPagesAppComponent } from './public-pages.app.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';
import { InstituicaoComponent } from '../donor/Instituicoes/instituicao.component';
import { InstituitionListComponent } from '../../shared/components/instituition-list.component/instituition-list.component';

export const publicPagesRouterConfig: Routes = [
  {
    path: '',
    component: PublicPagesAppComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'stories', component: StoriesComponent },
      {
        path: 'instituicoes',
        component: InstituitionListComponent,
      },
      {
        path: 'instituicao/:slug',
        component: InstituicaoComponent,
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicPagesRouterConfig)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
