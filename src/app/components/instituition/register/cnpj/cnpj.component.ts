import { Component, EventEmitter, Output } from '@angular/core';
import { MockApiService } from '../../../../core/services/mock-api.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cnpj', 
  standalone: false, 
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']  
})
export class CnpjComponent {
  @Output() avancar = new EventEmitter<string>();

  cnpj: string = ''; 

  loading = false;
  cnpjData: any = null;

  constructor(private mockApi: MockApiService) { }

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
  onSubmit(): void {
    if (this.cnpj.length !== 18) {
      alert('Por favor, informe um CNPJ válido.');
      return;
    }
    this.loading = true;
    this.mockApi.getCnpjInfo(this.cnpj).subscribe({
      next: (data) => {
        this.loading = false;
        if (!data) {
          alert('CNPJ não encontrado na base mock. Prosseguindo apenas com o número.');
          this.avancar.emit(this.cnpj);
          return;
        }
        this.cnpjData = data;
        // Envia objeto com cnpj + dados estruturados
        this.avancar.emit(JSON.stringify({ cnpj: this.cnpj, data }));
      },
      error: () => {
        this.loading = false;
        alert('Erro ao consultar CNPJ. Tente novamente.');
        this.avancar.emit(this.cnpj);
      }
    });
  }
}