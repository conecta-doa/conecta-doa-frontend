// ARQUIVO: institution-donor-notification-component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmReceiptModal, DialogData} from '../confirm-receipt-modal/confirm-receipt-modal'; 
import { FormsModule } from '@angular/forms'; 


export interface DonationNotification {
  amount: string;
  donor: string;
  time: string;
  isUnread: boolean;     
  isConfirmed: boolean;  
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule], 
  templateUrl: './institution-donor-notification-component.html',
  styleUrls: ['institution-donor-notification-component.css']
})
export class NotificationComponent { 

 
  notifications: DonationNotification[] = [
    { amount: 'R$50,00', donor: 'João Pereira', time: 'Hoje, 14:32', isUnread: true, isConfirmed: false },
    { amount: 'R$30,00', donor: 'Maria Silva', time: 'Hoje, 10:15', isUnread: true, isConfirmed: false },
    { amount: 'R$15,00', donor: 'Carlos Souza', time: 'Ontem, 09:00', isUnread: true, isConfirmed: true }, 
  ];

  constructor(private dialog: MatDialog) {}

 

  openModal(notification: DonationNotification) {
   
    const dialogRef = this.dialog.open(ConfirmReceiptModal, {
      width: '400px',

      data: { amount: notification.amount, donor: notification.donor } as DialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Doação de ${notification.amount} confirmada!`);
        this.markAsConfirmed(notification);
      } else {
        console.log('Cancelado');
      }
    });
  }

  markAsConfirmed(notification: DonationNotification): void {
    // Busca a notificação na lista e a atualiza
    const index = this.notifications.indexOf(notification);
    if (index > -1) {
        this.notifications[index] = { 
            ...notification, 
            isUnread: false, 
            isConfirmed: true 
        };
    }
  }




  acao1(): void {
    this.notifications = this.notifications.map(n => ({ 
      ...n, 
      isUnread: false 
    }));
  }


  acao2(): void {
    if (confirm('Tem certeza de que deseja limpar todas as notificações?')) {
      this.notifications = [];
    }
  }
}