import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success', 
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent { 
  constructor() { }
}