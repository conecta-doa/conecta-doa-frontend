import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SharedModule } from './shared/components/shared.module';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private keycloak: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit() {
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (isLoggedIn && (this.router.url === '/' || this.router.url === '/home')) {
      const kc = this.keycloak.getKeycloakInstance();
      const tokenParsed: any = kc.tokenParsed || {};
      const username = (tokenParsed.preferred_username || '').toString();
      const digits = username.replace(/\D/g, '');
      if (digits.length === 14) {
        // CNPJ -> instituição
        this.router.navigate(['/instituicao']);
      } else if (digits.length === 11) {
        // CPF -> doador
        this.router.navigate(['/donor']);
      } else {
        console.warn('Username não parece CPF/CNPJ:', username);
        this.router.navigate(['/home']);
      }
    }
  }
}
