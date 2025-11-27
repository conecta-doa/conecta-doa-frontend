import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  constructor(private keycloak: KeycloakService) {}

  /**
   * Mantido para compatibilidade com o código antigo.
   * Hoje o token "oficial" vem do Keycloak, mas se você ainda
   * usa algum login mock / API própria, pode continuar salvando aqui.
   */
  setToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch {
      // ignore storage errors
    }
  }

  /**
   * Pega o token, priorizando o do Keycloak.
   */
  getToken(): string | null {
    const kcToken = this.keycloak.getKeycloakInstance().token;
    if (kcToken) {
      return kcToken;
    }

    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Versão síncrona usada em vários lugares do código.
   * Retorna true se existir token (Keycloak ou localStorage).
   */
  hasToken(): boolean {
    return !!this.getToken();
  }

  clearToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch {
      // ignore storage errors
    }
  }

  /**
   * Se quiser manter a limpeza de dados locais + logout no Keycloak.
   */
  logout(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    } catch {
      // ignore storage errors
    }

    // Faz logout também no Keycloak e volta pra /home
    this.keycloak.logout(window.location.origin + '/home');
  }
}
