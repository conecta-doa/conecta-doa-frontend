import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instituition-settings',
  standalone: false,
  templateUrl: './instituition-settings.component.html',
})
export class InstituitionSettingsComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/instituicao']);
  }
}
