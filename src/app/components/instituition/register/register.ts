import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header';
import { FooterComponent} from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-register',
  imports: [FooterComponent,HeaderComponent],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}
