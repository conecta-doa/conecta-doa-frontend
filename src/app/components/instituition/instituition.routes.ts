import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstituitionAppComponent } from "./instituition.app.component";
import { InstituitionDashboardComponent } from "./dashboard/instituition-dashboard.component";
import { InstituitionRegisterComponent } from "./register/instituition-register.component";
import { ManageProfileComponent } from "./menage-profile/institution-manage-profile-component";

export const instituitionRouterConfig: Routes = [
    { path: '', component: InstituitionAppComponent,
        children: [
            { path: '', component: ManageProfileComponent },
            { path: '', component: InstituitionDashboardComponent },
            { path: 'register', component: InstituitionRegisterComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(instituitionRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class InstituitionRoutingModule { }