import { Component, Input } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instituition-header',
  standalone: false,
  templateUrl: './instituition-header.component.html',
  styleUrls: ['./instituition-header.component.css']
})
export class InstituitionHeaderComponent {
  constructor(private auth: Auth, private router: Router) { }

  // Nome da instituição – futuramente pode vir do backend
  @Input() institutionName: string = 'ACME CORPORATION';

  // Logo/avatar
  @Input() avatarUrl: string =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAkVwTtIQ3S0f6M4uzNNj8xRg0tsb8zeKgHgBWWZc09FilcxnYFQXl96nA7Rh3NCwbR05dMdnZXe41VCk1cpDDIokokndJOmvfEHuq6ZNKYKpfjtzgHhtBBZ38dCixUYrcvU4qeYTV71mtSPLEPqNgA4bjx6UxWWP5c0fy3JXv5LQEYH7FMNfH_v9Zn9paLnkKJvbRAqQ7c0WROBhGkPpKvtpwZiwW-1qkUnSc-kc9azfSP7gIBAqE165ndGqnHzzejImf4sr-phSMc';

  onNotificationsClick() {
    this.router.navigate(['/instituicao/notifications']);
  }

  onSettingsClick() {
    this.router.navigate(['/instituicao/settings']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
