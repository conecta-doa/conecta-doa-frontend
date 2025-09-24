import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
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
