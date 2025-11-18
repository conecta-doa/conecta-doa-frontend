import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPagesAppComponent } from './public-pages.app.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';

export const publicPagesRouterConfig: Routes = [
  {
    path: '',
    component: PublicPagesAppComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'stories', component: StoriesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicPagesRouterConfig)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
