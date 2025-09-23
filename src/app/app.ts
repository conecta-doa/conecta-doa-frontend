import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterModule],
})
export class App {
  protected readonly title = signal('Conecta-doa');
}
