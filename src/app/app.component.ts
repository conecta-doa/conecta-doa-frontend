import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/components/shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SharedModule],
})
export class AppComponent {
  protected readonly title = signal('Conecta-doa');

  constructor(private router: Router) {}

  showHeader() {
    const hiddenRoutes = ['/institution/notifications']; 
    return !hiddenRoutes.includes(this.router.url);
  }
}
