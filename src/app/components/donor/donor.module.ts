import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorDashboardComponent } from './dashboard/donor-dashboard.component';
import { DonorRegisterComponent } from './register/donor-register.component';
import { DonorRoutingModule } from './donor.routes';
import { DonorAppComponent } from './donor.app.component';

@NgModule({
    declarations: [DonorAppComponent, DonorDashboardComponent, DonorRegisterComponent],
    exports: [],
    imports: [CommonModule, DonorRoutingModule]
})
export class DonorModule {}
