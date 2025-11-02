import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cnpj', 
  standalone: true, 
  imports: [ CommonModule, FormsModule ],
  templateUrl: './cnpj.component.html',
  styleUrls: ['./cnpj.component.css']  
})
export class CnpjComponent {
  @Output() avancar = new EventEmitter<string>();

  cnpj: string = ''; 

  constructor() { }

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
    
    if (this.cnpj.length === 18) {
      this.avancar.emit(this.cnpj); 
    } else {
      alert('Por favor, informe um CNPJ válido.');
    }
  }
}