import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { InstituitionRoutingModule } from './instituition.routes'; 
import { InstituitionRegisterComponent } from './register/instituition-register.component';
import { FormsModule } from '@angular/forms';
import { ManageProfileComponent } from './manage-profile/institution-manage-profile-component';
import { NotificationComponent } from './institution-donor-notification/institution-donor-notification-component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';








@NgModule({
  declarations: [
    InstituitionAppComponent,
    InstituitionDashboardComponent,
    InstituitionRegisterComponent,
   
  
   
    
  
    
   
    
  ],
  imports: [
    CommonModule,
    InstituitionRoutingModule,
    FormsModule,
    ManageProfileComponent, 
    NotificationComponent ,
     MatDialogModule,
     MatButtonModule,
    
        
    

     
    
  ]
})
export class InstituitionModule {}

=======
import { InstituitionDashboardComponent } from './dashboard/instituition-dashboard.component';
import { CnpjComponent } from './register/cnpj/cnpj.component';
import { ValidationComponent } from './register/validation/validation.component';
import { ResponsibleComponent } from './register/responsible/responsible.component';
import { SecurityComponent } from './register/security/security.component';
import { SuccessComponent } from './register/success/success.component';

@NgModule({
  declarations: [
    InstituitionRegisterComponent,
    InstituitionDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule, 
    InstituitionRoutingModule, 
    CnpjComponent,
    ValidationComponent,
    ResponsibleComponent,
    SecurityComponent,
    SuccessComponent
  ]
})
export class InstituitionModule { }

