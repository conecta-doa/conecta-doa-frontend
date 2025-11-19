import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicPagesRoutingModule } from './public-pages.routes';
import { PublicPagesAppComponent } from './public-pages.app.component';
import { HomeComponent } from './home/home.component';
import { StoriesComponent } from './stories/stories.component';
import { SharedModule } from "../../shared/components/shared.module";

@NgModule({
    declarations: [PublicPagesAppComponent, HomeComponent],
    exports: [],
    imports: [CommonModule, PublicPagesRoutingModule, StoriesComponent, SharedModule]
})
export class PublicPagesModule {}
