import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-instituicao',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css'],
  providers: [DecimalPipe] 
})
export class InstituicaoComponent {
  abaAtiva: string = 'sobre';

 
  progresso: number = 60; 
  arrecadado: number = 6000;
  meta: number = 10000;

  selecionarAba(aba: string): void {
    this.abaAtiva = aba;
  }

  isAbaAtiva(aba: string): boolean {
    return this.abaAtiva === aba;
  }
}