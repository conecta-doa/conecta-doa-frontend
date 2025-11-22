import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isOpen = false;
  isLoggedIn = false;

  constructor(
    public auth: Auth,
    private router: Router,
    private keycloak: KeycloakService
  ) {}

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    console.log('Logado no Keycloak?', this.isLoggedIn);
  }

  login() {
    this.keycloak.login({
      redirectUri: window.location.origin + '/home'
    });
  }

  logout(): void {
    this.auth.logout();
    this.keycloak.logout(window.location.origin + '/home');
    this.isLoggedIn = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any): void {
    const clickedInside = targetElement.closest('.dropdown');
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
}
