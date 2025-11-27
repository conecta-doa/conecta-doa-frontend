import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InstituitionRoutingModule } from './instituition.routes';

import { InstituitionAppComponent } from './instituition.app.component';
import { InstituitionDashboardComponent } from './dashboard/instituition-dashboard.component';
import { InstituitionHeaderComponent } from './header/instituition-header.component';
import { InstituitionRegisterComponent } from './register/instituition-register.component';
import { ValidationComponent } from './register/validation/validation.component';
import { SuccessComponent } from './register/success/success.component';
import { SecurityComponent } from './register/security/security.component';
import { ResponsibleComponent } from './register/responsible/responsible.component';
import { CnpjComponent } from './register/cnpj/cnpj.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstituitionNotificationsComponent } from './notifications/instituition-notifications.component';

@NgModule({
  declarations: [
    InstituitionAppComponent,
    InstituitionDashboardComponent,
    InstituitionHeaderComponent,
    InstituitionRegisterComponent,
    ValidationComponent,
    SuccessComponent,
    SecurityComponent,
    ResponsibleComponent,
    CnpjComponent,
    InstituitionNotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InstituitionRoutingModule,
  ],
})
export class InstituitionModule {}
