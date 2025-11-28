import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MockApiService } from '../../../core/services/mock-api.service';
import { InstitutionService, InstitutionData } from '../../../core/services/institution.service';
import { DonationService } from '../../../core/services/donation.service';

interface Donation {
  id?: string;
  createdAt?: string;
  institutionName?: string;
  institutionId?: string;
  type?: string;
  status?: string;
}

@Component({
  selector: 'app-donor-dashboard',
  standalone: false,
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css'],
})
export class DonorDashboardComponent implements OnInit, OnDestroy {
  name = '';
  title = '';
  points = 0;
  ranking = 0;

  donations$!: Observable<any[]>;
  institutions$!: Observable<any[]>;
  suggestedInstitutions: InstitutionData[] = [];

  private donorId: string | null = null;
  private pollSub: Subscription | null = null;

  constructor(
    private mockApi: MockApiService,
    private donationService: DonationService,
    private institutionService: InstitutionService
  ) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('user');
    let currentUser: any = null;
    try {
      currentUser = raw ? JSON.parse(raw) : null;
    } catch {
      currentUser = null;
    }

    // Carrega instituições do serviço público e limita a 3 para "Sugestões Próximas"
    this.suggestedInstitutions = this.institutionService.list().slice(0, 3);

    if (!currentUser || !currentUser.id) {
      this.donations$ = this.donationService.getAll();
      return;
    }
    this.mockApi.getDonors().subscribe({
      next: (donors) => {
        const donor = (donors || []).find((d: any) => d.userId === currentUser.id);
        if (!donor) {
          this.donations$ = this.donationService.getAll();
          return;
        }

        this.donorId = donor.id;
        this.name = donor.name || currentUser.name || '';
        this.title = 'Heart of Gold 💛';
        this.points = donor.points || 0;
        this.ranking = donor.ranking || 0;
        this.donations$ = timer(0, 5000).pipe(
          switchMap(() => this.donationService.getAll(donor.id))
        );

        this.pollSub = timer(0, 5000)
          .pipe(switchMap(() => this.donationService.getDonorById(donor.id)))
          .subscribe({
            next: (freshDonor) => {
              this.points = freshDonor?.points || 0;
            },
            error: (err) => {
              console.error('Failed polling donor', err);
            },
          });
      },
      error: (err) => {
        console.error('Failed to load donors', err);
        this.donations$ = this.donationService.getAll();
      },
    });
  }

  ngOnDestroy(): void {
    if (this.pollSub) this.pollSub.unsubscribe();
  }
}
