import { Component } from '@angular/core';

interface Doacao {
  data: string;
  instituicao: string;
  tipo: string;
  status: string;
}

@Component({
  selector: 'app-painel-doador',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelDoadorComponent {
  nome = 'Isabela Silva';
  titulo = 'Coração de Ouro 💛';
  pontos = 1250;
  ranking = 5;

  historicoDoacoes: Doacao[] = [
    { data: '15/03/2024', instituicao: 'Lar da Esperança', tipo: 'Alimentos', status: 'Concluída' },
    { data: '20/02/2024', instituicao: 'Abrigo Fraterno', tipo: 'Roupas', status: 'Concluída' },
    { data: '05/01/2024', instituicao: 'Casa do Acolhimento', tipo: 'Financeiro', status: 'Concluída' }
  ];
}