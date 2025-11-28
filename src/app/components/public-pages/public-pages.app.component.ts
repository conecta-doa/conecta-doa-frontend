import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { AuthRedirectService } from '../../core/services/auth-redirect.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  standalone: false,
  selector: 'public-pages-app-root',
  template: `
    <ng-container *ngIf="isLoggedIn; else publicHeader">
      <app-donor-header *ngIf="isDonor"></app-donor-header>
      <app-instituition-header *ngIf="isInstitution"></app-instituition-header>
    </ng-container>
    <ng-template #publicHeader><app-header></app-header></ng-template>
    <router-outlet></router-outlet>
  `,
})
export class PublicPagesAppComponent {
  isLoggedIn = false;
  isDonor = false;
  isInstitution = false;

  constructor(
    public auth: Auth,
    private authRedirect: AuthRedirectService,
    private router: Router,
    private keycloak: KeycloakService
  ) {}

  async ngOnInit() {
    const url = this.router.url;
    if (url === '/' || url === '/home') {
      await this.authRedirect.redirectByDocument();
    }

    // Descobre tipo de usuário logado (CPF -> doador, CNPJ -> instituição)
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      const kc = this.keycloak.getKeycloakInstance();
      const tokenParsed: any = kc.tokenParsed || {};
      const username = (tokenParsed.preferred_username || '').toString();
      const digits = username.replace(/\D/g, '');
      this.isInstitution = digits.length === 14; // CNPJ
      this.isDonor = digits.length === 11; // CPF
    }
  }
}
