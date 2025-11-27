import { Component } from '@angular/core';

@Component({
  selector: 'app-instituition-app',
  standalone: false,
  template: `
    <app-instituition-header></app-instituition-header>
    <router-outlet></router-outlet>
  `,
})
export class InstituitionAppComponent {}
