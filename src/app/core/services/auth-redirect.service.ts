import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthRedirectService {
  constructor(
    private keycloak: KeycloakService,
    private router: Router
  ) {}

  async redirectByDocument(): Promise<void> {
    const logged = await this.keycloak.isLoggedIn();
    if (!logged) return;

    const token: any = this.keycloak.getKeycloakInstance().tokenParsed;
    let username: string = token?.preferred_username || '';
    username = username.replace(/\D/g, '');
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/donor') || currentUrl.startsWith('/instituition')) {
      return;
    }

    if (username.length === 14) {
      this.router.navigate(['/instituition']);
    } else if (username.length === 11) {
      this.router.navigate(['/donor']);
    } else {
      console.warn('Documento com tamanho inesperado:', username);
    }
  }
}
