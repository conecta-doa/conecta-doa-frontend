import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorDashboardComponent } from './dashboard/donor-dashboard.component';
import { DonorRegisterComponent } from './register/donor-register.component';
import { DonorRoutingModule } from './donor.routes';
import { DonorAppComponent } from './donor.app.component';

import { DonorDonationComponent } from './donor-donation.component/donor-donation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DonorHeaderComponent } from './donor-header.component/donor-header.component';
import { SharedModule } from '../../shared/components/shared.module';
import { DonorConfirmedDonationComponent } from './donor-confirmed-donation.component/donor-confirmed-donation.component';

@NgModule({
  declarations: [
    DonorAppComponent,
    DonorDashboardComponent,
    DonorRegisterComponent,
    DonorDonationComponent,
    DonorConfirmedDonationComponent,
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DonorHeaderComponent,
  ],
  exports: [],
})
export class DonorModule {}
