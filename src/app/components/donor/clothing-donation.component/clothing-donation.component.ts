import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type Metodo = 'retirada' | 'ponto';

@Component({
  selector: 'app-doacao-roupas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clothing-donation.component.html',
  styleUrls: ['./clothing-donation.component.css'],
})
export class ClothingDonationComponent {
  tipo = '';
  condicao = '';
  quantidade: number | null = null;
  metodo: Metodo = 'retirada';
  endereco = '';

  constructor(private router: Router) {}

  confirmar() {
    this.router.navigateByUrl('/confirmacao');
  }
}
