import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MockApiService } from '../../../core/services/mock-api.service';


interface Donation {
  date: string;
  institution: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-donor-dashboard',
  standalone: false,
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css'],
})
export class DonorDashboardComponent implements OnInit {
  name = '';
  title = '';
  points = 0;
  ranking = 0;

  donations$!: Observable<any[]>;
  donors$!: Observable<any[]>;
  institutions$!: Observable<any[]>;

  constructor(private mockApi: MockApiService) {}

  ngOnInit(): void {
    // Wire observables once (shareReplay already in service)
    this.donations$ = this.mockApi.getDonations();
    this.donors$ = this.mockApi.getDonors();
    this.institutions$ = this.mockApi.getInstitutions();

    // Example: find donor by CPF (ensure CPF matches mock-data.json)
    const cpf = '12345678901';
    this.mockApi.findUserByDocument(cpf).subscribe({
      next: (user) => {
        if (user) {
          this.name = user.name || '';
          this.title = 'Heart of Gold 💛';
          this.points = user.points || 0;
          this.ranking = user.ranking || 0;
        } else {
          console.warn('Mock user not found for document', cpf);
        }
      },
      error: (err) => console.error('Failed to load mock user', err),
    });
  }

  // Static fallback while async data loads
  donationHistory: Donation[] = [
    { date: '15/03/2024', institution: 'Lar da Esperança', type: 'Alimentos', status: 'Concluída' },
    { date: '20/02/2024', institution: 'Abrigo Fraterno', type: 'Roupas', status: 'Concluída' },
    {
      date: '05/01/2024',
      institution: 'Casa do Acolhimento',
      type: 'Financeiro',
      status: 'Concluída',
    },
  ];
}
