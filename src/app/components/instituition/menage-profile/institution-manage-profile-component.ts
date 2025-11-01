// No arquivo: institution-manage-profile-component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-user-settings', 
  
  // 1. CORREÇÃO: Mude 'menage' para 'manage' e adicione a extensão .html
  templateUrl: './institution-manage-profile-component.html', 
  
  // 2. CORREÇÃO: Mude 'menage' para 'manage' e adicione a extensão .css
  styleUrls: ['./instituition-manage-profile-component.css'] 
})
// 3. CORREÇÃO: Mude o nome da classe de 'Menage' para 'Manage' (Boa prática)
export class ManageProfileComponent  {
    // ...
}