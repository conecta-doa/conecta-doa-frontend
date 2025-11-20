import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonorHeaderComponent } from '../../../components/donor/donor-header.component/donor-header.component';
import { Auth } from '../../../core/services/auth';

import { InstitutionService, InstitutionData } from '../../../core/services/institution.service';
import { DonationContextService } from '../../../core/services/donation-context.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared.module';

interface Institution {
  name: string;
  description: string;
  tags: string[];
  image: string;
  badge?: string;
  icon?: string;
  accentClass?: string;
}

@Component({
  selector: 'app-instituition-list',
  standalone: true,
  templateUrl: './instituition-list.component.html',
  styleUrls: ['./instituition-list.component.css'],
  imports: [CommonModule, FormsModule, DonorHeaderComponent, SharedModule],
})
export class InstituitionListComponent {
  onSelect(inst: InstitutionData) {
    this.navigateToInstitution(inst);
  }

  search = '';
  @Output() selectInstitution = new EventEmitter<InstitutionData>();
  institutions: InstitutionData[] = [];

  constructor(
    public auth: Auth,
    private institutionService: InstitutionService,
    private router: Router,
    private donationContext: DonationContextService
  ) {
    this.institutions = this.institutionService.list();
  }

  get filtered(): InstitutionData[] {
    const term = this.search.trim().toLowerCase();
    if (!term) return this.institutions;
    return this.institutions.filter(
      (i) =>
        i.name.toLowerCase().includes(term) ||
        i.description.toLowerCase().includes(term) ||
        i.tags.some((t) => t.toLowerCase().includes(term))
    );
  }

  navigateToInstitution(inst: InstitutionData) {
    this.router.navigate(['/instituicao', inst.slug], { state: { institution: inst } });
  }

  donate(inst: InstitutionData) {
    // Store selected institution in the shared DonationContextService so it
    // survives navigation through the login flow.
    this.donationContext.setSelectedInstitution(inst);

    if (this.auth.hasToken()) {
      this.router.navigate(['/donor/donation']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/donor/donation' },
      });
    }
  }
}
