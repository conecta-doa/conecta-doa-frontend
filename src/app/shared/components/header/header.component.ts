import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  isMenuOpen = false;
  isOpen = false;

  constructor(public auth: Auth, private router: Router) {}

  ngOnInit(): void {
    // subscribe to router events to help debug navigation issues
    this.router.events.subscribe((e) => {
      // eslint-disable-next-line no-console
      console.log('[Header] router.event', e);
      // eslint-disable-next-line no-console
      console.log('[Header] router.url', this.router.url);
    });
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

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  navigateTo(path: string, event?: Event): void {
    // prevent default anchor behavior (hash change) and navigate via router
    if (event) event.preventDefault();
    this.isOpen = false;
    console.log('[Header] navigateTo', path);
    // Use explicit navigation to avoid ambiguity with hash routing
    if (path === '/instituicao/register') {
      this.router.navigate(['/instituicao', 'register']);
      return;
    }
    const segments = path.split('/').filter((s) => s.length > 0);
    this.router.navigate(segments);
  }
}
