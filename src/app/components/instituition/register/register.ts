import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header';
import { FooterComponent } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  currentStep: number = 1;
  cnpj: string = '';
  

  estatutoSocial: File | null = null;
  ataDiretoria: File | null = null;
  certificadoFederal: File | null = null;
  certificadoOscip: File | null = null;
  alvaraFuncionamento: File | null = null;
  
 
  assinaturaDigital: boolean = false;
  vinculoConta: boolean = false;

  constructor() { }

  // FORMATAR CNPJ
  formatCnpj(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 14) {
      value = value.slice(0, 14);
    }
    
    if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    this.cnpj = value;
    event.target.value = value;
  }

  
  nextStep(): void {
  
    if (this.cnpj.length === 18) {
      this.currentStep = 2;
    } else {
      alert('Por favor, informe um CNPJ válido.');
    }
  }

 
  onFileSelected(event: any, fileType: string): void {
    const file: File = event.target.files[0];
    if (file) {
      switch (fileType) {
        case 'estatutoSocial':
          this.estatutoSocial = file;
          break;
        case 'ataDiretoria':
          this.ataDiretoria = file;
          break;
        case 'certificadoFederal':
          this.certificadoFederal = file;
          break;
        case 'certificadoOscip':
          this.certificadoOscip = file;
          break;
        case 'alvaraFuncionamento':
          this.alvaraFuncionamento = file;
          break;
      }
    }
  }


  submitDocuments(): void {
    
    if (!this.estatutoSocial || !this.ataDiretoria || !this.certificadoFederal) {
      alert('Por favor, envie os documentos obrigatórios.');
      return;
    }
    
    
    console.log('CNPJ:', this.cnpj);
    console.log('Documentos:', {
      estatutoSocial: this.estatutoSocial,
      ataDiretoria: this.ataDiretoria,
      certificadoFederal: this.certificadoFederal,
      certificadoOscip: this.certificadoOscip,
      alvaraFuncionamento: this.alvaraFuncionamento
    });
    
    alert('Documentos enviados com sucesso!');
   
  }
}