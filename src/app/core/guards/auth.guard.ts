import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { Auth } from '../services/auth';

function decide(router: Router, auth: Auth, url?: string): boolean | UrlTree {
  if (auth.hasToken()) return true;
  const returnUrl = url ?? router.routerState.snapshot.url;
  // debug log to help trace incorrect returnUrl like '/register'
  try {
    // eslint-disable-next-line no-console
    console.log('[AuthGuard] blocking navigation to', url, 'computed returnUrl=', returnUrl);
    // Additional diagnostics to help trace unexpected values
    // eslint-disable-next-line no-console
    console.log('[AuthGuard] routerState.snapshot.url=', router.routerState.snapshot.url);
    // eslint-disable-next-line no-console
    console.log(
      '[AuthGuard] current location.href=',
      typeof window !== 'undefined' ? window.location.href : 'no-window'
    );
    // eslint-disable-next-line no-console
    console.log('[AuthGuard] router.urlTree=', router.parseUrl(router.routerState.snapshot.url));
  } catch (e) {}
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
