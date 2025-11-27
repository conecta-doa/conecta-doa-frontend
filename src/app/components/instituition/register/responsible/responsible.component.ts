import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para o [(ngModel)]
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responsible', 
  standalone: false,
  templateUrl: './responsible.component.html',
  styleUrls: ['./responsible.component.css']
})
export class ResponsibleComponent { 

  @Output() voltar = new EventEmitter<void>();
  @Output() avancar = new EventEmitter<any>();

  responsavel = {
    nomeCompleto: '',
    cpf: '',
    cargo: '',
    email: '',
    telefone: ''
  };

  constructor() { }

  onVoltarClick() {
    this.voltar.emit();
  }

  onSubmit() {
    
    this.avancar.emit(this.responsavel);
  }
}