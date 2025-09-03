import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header';
import { FooterComponent} from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent] ,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
