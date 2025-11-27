import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

export const AuthGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  return keycloakService.isLoggedIn();
}