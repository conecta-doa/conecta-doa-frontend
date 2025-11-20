import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';

import { UserFormComponent } from './user-form/user-form.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { InstituitionListComponent } from './instituition-list.component/instituition-list.component';

@NgModule({
  declarations: [CardComponent, UserFormComponent],
  exports: [CardComponent, UserFormComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class SharedModule {}
