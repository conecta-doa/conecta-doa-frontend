import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/components/header/header";

@Component({
  selector: 'app-instituicao',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './instituicao.html',
  styleUrls: ['./instituicao.css']
})

export class instituicao {
  searchTerm: string = '';

  instituicoes = [
    {
      nome: 'Casa de Apoio ao Paciente com Câncer',
      local: 'São Paulo, SP',
      imagem: 'cancer.png',
      necessidades: [
        { label: 'Sangue A+', porcentagem: 75 },
        { label: 'Alimentos', porcentagem: 50 },
        { label: 'Roupas', porcentagem: 75 },
        { label: 'Arrecadações Financeiras', porcentagem: 90 }
      ]
    },
    {
      nome: 'Abrigo para crianças Órfãs',
      local: 'Rio de Janeiro, RJ',
      imagem: 'abrigo.png',
      necessidades: [
        { label: 'Sangue A+', porcentagem: 80 },
        { label: 'Alimentos', porcentagem: 70 },
        { label: 'Roupas', porcentagem: 25 },
        { label: 'Arrecadações Financeiras', porcentagem: 30 }
      ]
    },
    {
      nome: 'Asilo para Idosos',
      local: 'Belo Horizonte, MG',
      imagem: 'asilo.png',
      necessidades: [
        { label: 'Sangue A+', porcentagem: 60 },
        { label: 'Alimentos', porcentagem: 100 },
        { label: 'Roupas', porcentagem: 80 },
        { label: 'Arrecadações Financeiras', porcentagem: 20 }
      ]
    },
  ];
}