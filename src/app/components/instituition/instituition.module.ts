import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardInstituition } from './dashboard/dashboard';
import { RegisterInstitution } from './register/register';
import { FormsModule } from '@angular/forms';
import { InstituicaoComponent } from './instituicoes/instituicao';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/components/shared-components.module';

@NgModule({
  declarations: [RegisterInstitution, InstituicaoComponent, DashboardInstituition],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
  ],
})
export class InstituitionModule {}
