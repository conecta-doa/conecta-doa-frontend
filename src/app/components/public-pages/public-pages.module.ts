import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicPagesRoutingModule } from './public-pages.routes';
import { PublicPagesAppComponent } from './public-pages.app.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';
import { SharedModule } from '../../shared/components/shared.module';
import { DonorHeaderComponent } from '../donor/donor-header.component/donor-header.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { InstituitionListComponent } from '../../shared/components/instituition-list.component/instituition-list.component';

@NgModule({
  declarations: [PublicPagesAppComponent, HomeComponent],
  exports: [],
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    StoriesComponent,
    SharedModule,
    DonorHeaderComponent,
    HeaderComponent,
    InstituitionListComponent,
  ],
})
export class PublicPagesModule {}
