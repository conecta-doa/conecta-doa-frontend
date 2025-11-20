import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-donor-header',
  standalone: true,
  templateUrl: './donor-header.component.html',
  styleUrls: ['./donor-header.component.css'],
  imports: [CommonModule, RouterModule],
})
export class DonorHeaderComponent {
  constructor(private auth: Auth, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
