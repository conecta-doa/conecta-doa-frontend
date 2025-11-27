import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-donor-register',
  standalone: false,
  templateUrl: './donor-register.component.html',
  styleUrls: ['./donor-register.component.css'],
})
export class DonorRegisterComponent {
  constructor(private keycloak: KeycloakService) {}

    login() {
    this.keycloak.login({
      redirectUri: window.location.origin + '/home'
    });
  }
}
