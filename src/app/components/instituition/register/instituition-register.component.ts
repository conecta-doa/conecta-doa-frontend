import { Component } from '@angular/core';

@Component({
  selector: 'app-instituition-register',
  standalone: false,
  templateUrl: './instituition-register.component.html',
  styleUrls: ['./instituition-register.component.css']
})
export class InstituitionRegisterComponent {
  currentStep: number = 1;
  cnpj: string = '';

  estatutoSocial: File | null = null;
  ataDiretoria: File | null = null;
  certificadoFederal: File | null = null;
  certificadoOscip: File | null = null;
  alvaraFuncionamento: File | null = null;

  assinaturaDigital: boolean = false;
  vinculoConta: boolean = false;

  dadosDaApi: any = null;
  dadosCnpj: string = '';
  dadosValidacao: any = null;
  dadosResponsavel: any = null;
  dadosSeguranca: any = null;

  constructor() {}

  formatCnpj(event: any): void {
    let value = (event && event.target && event.target.value) ? String(event.target.value) : '';
    value = value.replace(/\D/g, '');

    if (value.length > 14) {
      value = value.slice(0, 14);
    }

    // Apply basic CNPJ mask: 00.000.000/0000-00
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');

    this.cnpj = value;
    if (event && event.target) {
      event.target.value = value;
    }
  }

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
