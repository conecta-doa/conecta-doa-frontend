import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionService, InstitutionData } from '../../../core/services/institution.service';
import { Auth } from '../../../core/services/auth';
import { DonorHeaderComponent } from '../donor-header.component/donor-header.component';
import { SharedModule } from '../../../shared/components/shared.module';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { DonorModule } from '../donor.module';

interface DonationItem {
  id: string;
  title: string;
  description: string;
  required: number;
  current: number;
  category: string;
  unit: string;
}

@Component({
    selector: 'app-instituicao',
    standalone: true,
    templateUrl: './instituicao.component.html',
    styleUrls: ['./instituicao.component.css'],
    providers: [DecimalPipe],
    imports: [CommonModule, SharedModule, HeaderComponent, DonorModule]
})
export class InstituicaoComponent implements OnInit {
  abaAtiva: string = 'sobre';
  institution?: InstitutionData;
  isLoading: boolean = true;
  errorMessage: string = '';

  donationItems: DonationItem[] = [
    {
      id: '1',
      title: 'Cestas Básicas',
      description: 'Para garantir a alimentação de 50 famílias por um mês.',
      required: 50,
      current: 25,
      category: 'food',
      unit: 'unidades',
    },
  ];

  progresso: number = 60;
  arrecadado: number = 6000;
  meta: number = 10000;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private institutionService: InstitutionService,
    public auth: Auth
  ) {}

  ngOnInit(): void {
    this.loadInstitution();
  }

  public loadInstitution(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      try {
        this.institution = this.institutionService.findBySlug(slug);
        if (!this.institution) {
          this.router.navigate(['/not-found']);
          return;
        }
      } catch (error) {
        this.errorMessage = 'Erro ao carregar instituição';
        console.error('Error loading institution:', error);
      }
    } else {
      const navState = this.router.getCurrentNavigation()?.extras.state as {
        institution: InstitutionData;
      };
      this.institution = navState?.institution;

      if (!this.institution) {
        this.router.navigate(['/institutions']);
        return;
      }
    }

    this.isLoading = false;
  }

  selecionarAba(aba: string): void {
    this.abaAtiva = aba;
  }

  isAbaAtiva(aba: string): boolean {
    return this.abaAtiva === aba;
  }

  donate(): void {
    if (!this.institution) return;

    if (this.auth.hasToken()) {
      this.router.navigate(['/donor/donation'], {
        state: { institution: this.institution },
      });
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/donor/donation' },
        state: { institution: this.institution },
      });
    }
  }

  donateItem(item: DonationItem): void {
    if (!this.institution) return;

    const donationData = {
      institution: this.institution,
      item: item,
    };

    if (this.auth.hasToken()) {
      this.router.navigate(['/donor/donation'], {
        state: { donationData },
      });
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/donor/donation' },
        state: { donationData },
      });
    }
  }
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/default-charity.JPG';
  }

  getCategoryEmoji(category: string): string {
    const emojis: { [key: string]: string } = {
      food: '🍞',
      clothing: '👕',
      education: '📚',
      financial: '💰',
    };
    return emojis[category] || '🎁';
  }
  getProgressPercentage(current: number, required: number): number {
    return Math.min(Math.round((current / required) * 100), 100);
  }
  getCategoryName(category: string): string {
    const names: { [key: string]: string } = {
      food: 'Alimentos',
      clothing: 'Roupas e Agasalhos',
      education: 'Materiais Educacionais',
      financial: 'Contribuições Financeiras',
    };
    return names[category] || 'Doações';
  }

  getItemsByCategory(category: string): DonationItem[] {
    return this.donationItems.filter((item) => item.category === category);
  }
}
