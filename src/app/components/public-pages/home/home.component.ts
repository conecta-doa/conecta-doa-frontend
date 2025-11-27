import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loginCadastroModalOpen: boolean = false;

  login() {
    this.keycloak.login({
      redirectUri: window.location.origin + '/home'
    });
  }

  constructor(public auth: Auth, private keycloak: KeycloakService) {}

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', function (event) {
        const menu = document.getElementById('dropdown-menu');
        const target = event.target as HTMLElement;
        const button = target.closest('button');

        if (!target.closest('#dropdown-menu') && !button) {
          menu?.classList.add('hidden');
        }
      });
    }
  }
}
