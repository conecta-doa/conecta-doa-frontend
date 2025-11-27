import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-success', 
  standalone: false,
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent { 
  constructor(private keycloak: KeycloakService) { }

  
  login() {
    this.keycloak.login({
      redirectUri: window.location.origin + '/home'
    });
  }
}