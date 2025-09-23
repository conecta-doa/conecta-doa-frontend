import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorDashboardComponent } from './dashboard/donor-dashboard.component';
import { DonorRegisterComponent } from './register/donor-register.component';
import { DonorRoutingModule } from './donor.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/components/shared-components.module';

@NgModule({
    declarations: [DonorDashboardComponent, DonorRegisterComponent],
    exports: [],
    imports: [CommonModule, DonorRoutingModule, RouterModule, SharedModule]
})
export class DonorModule {}
