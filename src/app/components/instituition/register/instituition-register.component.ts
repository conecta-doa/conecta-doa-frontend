import { Component } from '@angular/core';
import { MockApiService } from '../../../core/services/mock-api.service';
import { Router } from '@angular/router';

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

  isSaving = false;
  saveError: string | null = null;

  constructor(private mockApi: MockApiService, private router: Router) {}

  formatCnpj(event: any): void {
    let value = (event && event.target && event.target.value) ? String(event.target.value) : '';
    value = value.replace(/\D/g, '');

    if (value.length > 14) {
      value = value.slice(0, 14);
    }

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
    try {
      // Se vier JSON com dados mockados
      if (cnpj.startsWith('{')) {
        const parsed = JSON.parse(cnpj);
        this.dadosCnpj = parsed.cnpj;
        this.dadosDaApi = {
          razaoSocial: parsed.data.razaoSocial,
          nomeFantasia: parsed.data.nomeFantasia,
          endereco: `${parsed.data.endereco.street}, ${parsed.data.endereco.number}, ${parsed.data.endereco.city} - ${parsed.data.endereco.state}`,
          email: parsed.data.email,
          telefone: parsed.data.telefone
        };
      } else {
        this.dadosCnpj = cnpj;
        this.dadosDaApi = null;
      }
    } catch {
      this.dadosCnpj = cnpj;
      this.dadosDaApi = null;
    }
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

  private slugify(value: string): string {
    return (value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 60);
  }

  finalizeCadastro() {
    if (this.isSaving) return;
    this.saveError = null;

    // Necessário: dadosValidacao (instituição), dadosResponsavel, dadosSeguranca, dadosCnpj
    if (!this.dadosValidacao || !this.dadosResponsavel || !this.dadosSeguranca || !this.dadosCnpj) {
      this.saveError = 'Dados incompletos para salvar cadastro.';
      return;
    }

    this.isSaving = true;

    const razaoSocial = this.dadosValidacao.razaoSocial || this.dadosDaApi?.razaoSocial || 'Instituicao';
    const nomeFantasia = this.dadosValidacao.nomeFantasia || this.dadosDaApi?.nomeFantasia || razaoSocial;
    const cnpjLimpo = this.dadosCnpj.replace(/\D/g, '');
    const slug = this.slugify(nomeFantasia || razaoSocial);

    const institutionPayload = {
      id: slug,
      slug,
      name: nomeFantasia,
      razaoSocial,
      cnpj: cnpjLimpo,
      description: this.dadosValidacao.endereco || 'Instituição cadastrada.',
      address: this.parseEndereco(this.dadosValidacao.endereco),
      contact: {
        phone: this.dadosValidacao.telefone,
        email: this.dadosValidacao.email,
      },
      responsible: this.dadosResponsavel,
      security: { password: this.dadosSeguranca.senha },
      createdAt: new Date().toISOString(),
      verified: false,
      tags: [],
      image: 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(nomeFantasia)
    };

    this.mockApi.addInstitution(institutionPayload).subscribe({
      next: () => {
        this.isSaving = false;
        // Redireciona para página pública
        this.router.navigate(['/instituition', slug]);
      },
      error: (err) => {
        console.error('Falha ao salvar instituição', err);
        this.saveError = 'Falha ao salvar instituição.';
        this.isSaving = false;
      }
    });
  }

  private parseEndereco(endereco: string) {
    if (!endereco) return null;
    // Tentativa simples de dividir: rua, número, cidade - UF
    const cityStateMatch = endereco.match(/([^,]+)-\s*([A-Z]{2})$/);
    let city: string | undefined;
    let state: string | undefined;
    if (cityStateMatch) {
      city = cityStateMatch[1].trim();
      state = cityStateMatch[2].trim();
    }
    return {
      raw: endereco,
      city,
      state
    };
  }
}
