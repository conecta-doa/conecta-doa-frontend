import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituitionAppComponent } from './instituition.app.component';
import { InstituitionRoutingModule } from './instituition.routes';
import { InstituitionDashboardComponent } from './dashboard/instituition-dashboard.component';
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

