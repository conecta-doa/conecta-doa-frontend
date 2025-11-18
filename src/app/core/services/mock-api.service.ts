import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, shareReplay, catchError, delay } from 'rxjs/operators';

export interface LoginResult {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private readonly url = 'assets/mock-data.json';

  private data$!: Observable<any>;

  constructor(private http: HttpClient) {}

  private loadData(): Observable<any> {
    if (!this.data$) {
      this.data$ = this.http.get<any>(this.url).pipe(

        shareReplay(1),
        catchError((err) => {
          return throwError(
            () => new Error('Não foi possível carregar mock-data.json: ' + (err?.message || err))
          );
        })
      );
    }
    return this.data$;
  }

  private normalizeDocument(doc: string): string {
    return (doc || '').toString().replace(/\D/g, '');
  }
  login(document: string, password: string): Observable<LoginResult> {
    const doc = this.normalizeDocument(document);
    return this.loadData().pipe(
      map((data) => {
        const user = (data.users || []).find(
          (u: any) =>
            u.cpf === doc ||
            u.cnpj === doc ||
            u.cpf_formatted === document ||
            u.cnpj_formatted === document
        );
        if (!user) throw new Error('Usuário não encontrado');
        if (user.password !== password) throw new Error('Credenciais inválidas');
        return {
          token: user.token || 'mock-token-' + user.id,
          user: { id: user.id, name: user.name, role: user.role, email: user.email },
        } as LoginResult;
      }),
      delay(200),
      catchError((err) => throwError(() => err))
    );
  }
  getDonors(): Observable<any[]> {
    return this.loadData().pipe(map((d) => d.donors || []));
  }

  getInstitutions(): Observable<any[]> {
    return this.loadData().pipe(map((d) => d.institutions || []));
  }

  getDonations(): Observable<any[]> {
    return this.loadData().pipe(map((d) => d.donations || []));
  }

  findUserByDocument(document: string): Observable<any | null> {
    const doc = this.normalizeDocument(document);
    return this.loadData().pipe(
      map((data) => {
        const user = (data.users || []).find((u: any) => u.cpf === doc || u.cnpj === doc);
        return user || null;
      })
    );
  }

  getSettings(): Observable<any> {
    return this.loadData().pipe(map((d) => d.settings || {}));
  }
}
