import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class FooterComponent {
  anoAtual: number = new Date().getFullYear();
}
