import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DonorAppComponent } from "./donor.app.component";
import { DonorDashboardComponent } from "./dashboard/donor-dashboard.component";
import { DonorRegisterComponent } from "./register/donor-register.component";
import { PainelDoadorComponent } from './paineldoador/painel.component';
import { InstituicaoComponent } from "./Instituicoes/instituicao.component";

export const donorRouterConfig: Routes = [
    { path: '', component: DonorAppComponent,
        children: [
            { path: '', component: DonorDashboardComponent},
            { path: 'register', component: DonorRegisterComponent},
            { path: 'painel', component: PainelDoadorComponent },
            { path: 'instituicao', component: InstituicaoComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(donorRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class DonorRoutingModule { }