import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonorAppComponent } from './donor.app.component';
import { DonorDashboardComponent } from './dashboard/donor-dashboard.component';
import { DonorRegisterComponent } from './register/donor-register.component';
import { InstituicaoComponent } from './Instituicoes/instituicao.component';
import { InstituitionListComponent } from '../../shared/components/instituition-list.component/instituition-list.component';
import { DonorDonationComponent } from './donor-donation.component/donor-donation.component';
import { DonorConfirmedDonationComponent } from './donor-confirmed-donation.component/donor-confirmed-donation.component';

export const donorRouterConfig: Routes = [
  {
    path: '',
    component: DonorAppComponent,
    children: [
      { path: '', component: DonorDashboardComponent },
      { path: 'register', component: DonorRegisterComponent },
      { path: 'instituicao', component: InstituicaoComponent },
      { path: 'instituicao/:slug', component: InstituicaoComponent },
      { path: 'instituicoes', component: InstituitionListComponent },
      { path: 'donation', component: DonorDonationComponent },
      { path: 'donation/confirmed', component: DonorConfirmedDonationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(donorRouterConfig)],
  exports: [RouterModule],
})
export class DonorRoutingModule {}
