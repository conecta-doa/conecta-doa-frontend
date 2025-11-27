import { Component } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { AuthRedirectService } from '../../core/services/auth-redirect.service';

@Component({
  standalone: false,
  selector: 'public-pages-app-root',
  template: `
     <!-- por enquanto usa sempre o header público -->
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
})
export class PublicPagesAppComponent {

  constructor(
    public auth: Auth,
    private authRedirect: AuthRedirectService
  ) {}

  async ngOnInit() {
    await this.authRedirect.redirectByDocument();
  }
}
