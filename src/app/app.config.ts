import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  inject,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MockApiService } from './core/services/mock-api.service';
import { HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // registra interceptor funcional que trata POST /api/auth/login via MockApiService
    provideHttpClient(
      withInterceptors([
        (req: any, next: any) => {
          const isLogin = req.url?.toString().endsWith('/api/auth/login') && req.method === 'POST';
          if (!isLogin) return next(req);

          const body = req.body || {};
          const document = body.document || body.cpf || body.cnpj || body.cpfCnpj || '';
          const password = body.password || '';
          const mockApi = inject(MockApiService);

          return mockApi.login(document, password).pipe(
            map((res) => new HttpResponse({ status: 200, body: res })),
            catchError((err) => throwError(() => err))
          );
        },
      ])
    ),
  ],
};
