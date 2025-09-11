import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer';
import { HeaderComponent } from '../../../shared/components/header/header';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  
}
