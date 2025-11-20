import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loginCadastroModalOpen: boolean = false;

  openLoginCadastroModal() {
    this.loginCadastroModalOpen = true;
  }
  toggleDropdown() {
    if (typeof document !== 'undefined') {
      const menu = document.getElementById('dropdown-menu');
      if (menu) {
        menu.classList.toggle('hidden');
      }
    }
  }

  constructor(public auth: Auth) {}

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
