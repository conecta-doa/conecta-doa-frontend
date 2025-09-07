import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paineldoador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paineldoador.html',
  styleUrls: ['./paineldoador.css']
})
export class Paineldoador {
  abaSelecionada = 'mensal';

  rankingMensal = [
    { nome: 'Isabela S.', doacoes: 15, pontos: 2500 },
    { nome: 'Lucas L.', doacoes: 12, pontos: 2000 },
    { nome: 'Ricardo R.', doacoes: 10, pontos: 1250 },
    { nome: 'Olivia C.', doacoes: 8, pontos: 1000 },
    { nome: 'Noah B.', doacoes: 6, pontos: 750 },
    { nome: 'Rafael S.', doacoes: 4, pontos: 400 },
  ];

  rankingSemanal = [
    { nome: 'João P.', doacoes: 4, pontos: 700 },
    { nome: 'Maria V.', doacoes: 3, pontos: 600 },
    { nome: 'Bruno A.', doacoes: 2, pontos: 450 },
  ];

  // Dados fictícios de doações mensais para gráfico de barras
  doacoesMensais = [
    { mes: 'Jan', valor: 50 },
    { mes: 'Fev', valor: 75 },
    { mes: 'Mar', valor: 30 },
    { mes: 'Abr', valor: 90 },
    { mes: 'Mai', valor: 40 },
    { mes: 'Jun', valor: 70 },

  ];

  get rankingAtual() {
    return this.abaSelecionada === 'mensal' ? this.rankingMensal : this.rankingSemanal;
  }

  calcularPorcentagem(doacoes: number): number {
    const maxDoacoes = Math.max(...this.rankingAtual.map(p => p.doacoes));
    if (maxDoacoes === 0) return 0;
    return (doacoes / maxDoacoes) * 100;
  }

  // Função para calcular a altura da barra para gráfico
  calcularAlturaBarra(valor: number): string {
    const maxValor = Math.max(...this.doacoesMensais.map(d => d.valor));
    const alturaPercentual = (valor / maxValor) * 100;
    return `${alturaPercentual}%`;
  }

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
  }
}
