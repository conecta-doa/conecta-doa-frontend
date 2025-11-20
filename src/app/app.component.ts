import { Component, signal } from '@angular/core';
import { Auth } from './core/services/auth';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SharedModule } from './shared/components/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  protected readonly title = signal('Conecta-doa');
  constructor(public auth: Auth) {}
}
