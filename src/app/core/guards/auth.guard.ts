import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Auth } from '../services/auth';

function decide(router: Router, auth: Auth, url?: string): boolean | UrlTree {
  if (auth.hasToken()) return true;
  const returnUrl = url ?? router.routerState.snapshot.url;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl } });
}

export const authCanActivate: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  return decide(router, auth, state?.url);
};

export const authCanMatch: CanMatchFn = (_route, segments) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const url = '/' + segments.map((s) => s.path).join('/');
  return decide(router, auth, url);
};
