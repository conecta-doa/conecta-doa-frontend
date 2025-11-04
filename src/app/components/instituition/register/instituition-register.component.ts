import { Component } from '@angular/core';

@Component({
  selector: 'app-instituition-register',
  standalone: false,
  templateUrl: './instituition-register.component.html', 
  styleUrls: ['./instituition-register.component.css'] 
})
export class InstituitionRegisterComponent {

  currentStep: number = 1;
  dadosDaApi: any = null;
  dadosCnpj: string = '';
  dadosValidacao: any = null;
  dadosResponsavel: any = null;
  dadosSeguranca: any = null;

  constructor() { }

  handleCnpjSubmit(cnpj: string) {
    console.log('CNPJ recebido do filho:', cnpj);
    this.dadosCnpj = cnpj;
    this.dadosDaApi = {
      razaoSocial: 'ACME CORPORATION LTDA',
      nomeFantasia: 'Acme Co',
      endereco: 'Av. Principal, 123, Centro, São Paulo - SP',
      email: 'contato@acme.com',
      telefone: '+55 (11) 99999-9999'
    };
    this.currentStep = 2; 
  }

  handleValidationSubmit(dadosValidados: any) {
    this.dadosValidacao = dadosValidados;
    this.currentStep = 3; 
  }

  handleResponsibleSubmit(dadosResponsavel: any) {
    this.dadosResponsavel = dadosResponsavel;
    this.currentStep = 4;
  }

  handleSecuritySubmit(dadosSeguranca: any) {
    this.dadosSeguranca = dadosSeguranca;
    this.currentStep = 5;
  }

  onVoltar() {
    if (this.currentStep > 1 && this.currentStep < 5) {
      this.currentStep--;
    }
  }
}