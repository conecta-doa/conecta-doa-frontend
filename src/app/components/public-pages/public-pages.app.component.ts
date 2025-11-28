import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { AuthRedirectService } from '../../core/services/auth-redirect.service';

@Component({
  standalone: false,
  selector: 'public-pages-app-root',
  template: `
    <ng-container *ngIf="auth.hasToken(); else publicHeader">
      <app-donor-header></app-donor-header>
    </ng-container>
    <ng-template #publicHeader>
      <app-header></app-header>
    </ng-template>
    <router-outlet></router-outlet>
  `,
})
export class PublicPagesAppComponent {

  constructor(
    public auth: Auth,
    private authRedirect: AuthRedirectService,
    private router: Router
  ) {}

  async ngOnInit() {
    const url = this.router.url;
    if (url === '/' || url === '/home') {
      await this.authRedirect.redirectByDocument();
    }
  }
}
