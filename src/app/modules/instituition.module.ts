import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardInstituition } from '../components/instituition/dashboard/dashboard';
import { RegisterInstitution } from '../components/instituition/register/register';
import { FormsModule } from '@angular/forms';
import { InstituicaoComponent } from '../components/instituition/instituicoes/instituicao';


@NgModule({
  declarations: [DashboardInstituition, RegisterInstitution, InstituicaoComponent],
  exports: [],
  imports: [CommonModule, FormsModule],
})
export class InstituitionModule {}
