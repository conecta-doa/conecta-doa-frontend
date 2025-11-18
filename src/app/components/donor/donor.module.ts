import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorDashboardComponent } from './dashboard/donor-dashboard.component';
import { DonorRegisterComponent } from './register/donor-register.component';
import { DonorRoutingModule } from './donor.routes';
import { DonorAppComponent } from './donor.app.component';

import { InstituicaoComponent } from './Instituicoes/instituicao.component';


@NgModule({
  declarations: [DonorAppComponent, DonorDashboardComponent, DonorRegisterComponent],
  imports: [CommonModule, DonorRoutingModule, InstituicaoComponent],
  exports: [],
})
export class DonorModule {}
