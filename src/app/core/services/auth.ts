import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  setToken(token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
    } catch {
      // ignore storage errors
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch {
      return null;
    }
  }

  hasToken(): boolean {
    return !!this.getToken(); // Corrigido para usar o método interno
  }

  clearToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch {
      // ignore storage errors
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    } catch {
      // ignore storage errors
    }
  }
}
