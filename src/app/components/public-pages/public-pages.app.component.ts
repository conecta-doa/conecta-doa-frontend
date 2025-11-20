import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';

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
  constructor(public auth: Auth) {}
}
