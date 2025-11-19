import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorDashboardComponent } from './dashboard/donor-dashboard.component';
import { DonorRegisterComponent } from './register/donor-register.component';
import { DonorRoutingModule } from './donor.routes';
import { DonorAppComponent } from './donor.app.component';

import { InstituicaoComponent } from './Instituicoes/instituicao.component';
import { DonorHeaderComponent } from './donor-header.component/donor-header.component';
import { DonorDonationComponent } from './donor-donation.component/donor-donation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DonorAppComponent,
    DonorDashboardComponent,
    DonorRegisterComponent,
    InstituicaoComponent,
    DonorHeaderComponent,
    DonorDonationComponent,
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class DonorModule {}
