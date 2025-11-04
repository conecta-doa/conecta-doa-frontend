import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-instituition-app',
  standalone: true, 
  imports: [
    RouterModule
  ],
  template: '<router-outlet></router-outlet>'
})
export class InstituitionAppComponent {

}