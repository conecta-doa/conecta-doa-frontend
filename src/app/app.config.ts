import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  inject,
  APP_INITIALIZER,
} from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MockApiService } from './core/services/mock-api.service';
import { HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular'

function initializeKeycloak(keycloak: KeycloakService ) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'conecta_doa',
        clientId: 'angular-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + 'assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
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
