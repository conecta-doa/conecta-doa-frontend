import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/components/shared.module';
import { UserSettingsComponent } from './components/instituition/UserSettings/institution-UserSettings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SharedModule,UserSettingsComponent],
})
export class AppComponent {
  protected readonly title = signal('Conecta-doa');
}
