import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituitionAppComponent } from './instituition.app.component';
import { InstituitionRoutingModule } from './instituition.routes';
import { InstituitionDashboardComponent } from './dashboard/instituition-dashboard.component';
import { InstituitionRegisterComponent } from './register/instituition-register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ InstituitionAppComponent, InstituitionDashboardComponent, InstituitionRegisterComponent ],
    exports: [],
    imports: [ CommonModule, InstituitionRoutingModule, FormsModule ]
})
export class InstituitionModule {}
