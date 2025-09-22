import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDonor } from '../components/donor/dashboard/dashboard';
import { RegisterDonor } from '../components/donor/register/register';
import { AppModule } from "../app.module";

@NgModule({
    declarations: [DashboardDonor, RegisterDonor],
    exports: [],
    imports: [CommonModule, AppModule]
})
export class DoadorModule {}
