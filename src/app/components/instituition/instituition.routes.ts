import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstituitionAppComponent } from "./instituition.app.component";
import { InstituitionDashboardComponent } from "./dashboard/instituition-dashboard.component";
import { InstituitionRegisterComponent } from "./register/instituition-register.component";
import { ManageProfileComponent } from "./manage-profile/institution-manage-profile-component";
import { NotificationComponent } from "./institution-donor-notification/institution-donor-notification-component";

export const InstituitionRouterConfig: Routes = [ // use InstituitionRouterConfig (camelCase)
    { 
        path: '', 
        component: InstituitionAppComponent,
        children: [
            // Rota Padrão (Página inicial do módulo: /institution)
            { path: '', component: InstituitionDashboardComponent, pathMatch: 'full' }, 
            
            // Rota de Gerenciamento de Perfil (URL: /institution/profile)
            { path: 'profile', component: ManageProfileComponent }, 

             { path: 'notification', component: NotificationComponent},

            { path: 'register', component: InstituitionRegisterComponent},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(InstituitionRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class InstituitionRoutingModule { }