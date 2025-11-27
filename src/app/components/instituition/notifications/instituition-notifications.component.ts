import { Component } from '@angular/core';

type DonationNotification = {
  id: number;
  message: string;
  timeLabel: string;
  isNew: boolean;
  confirmed: boolean;
};

@Component({
  selector: 'app-instituition-notifications',
  standalone: false,
  templateUrl: './instituition-notifications.component.html',
})
export class InstituitionNotificationsComponent {
  notifications: DonationNotification[] = [
    {
      id: 1,
      message: 'Você recebeu uma doação de R$50,00 de João Pereira',
      timeLabel: 'Hoje, 14:32',
      isNew: true,
      confirmed: false,
    },
    {
      id: 2,
      message: 'Você recebeu uma doação de R$100,00 de Anônimo',
      timeLabel: 'Ontem, 10:15',
      isNew: true,
      confirmed: false,
    },
    {
      id: 3,
      message: 'Você recebeu uma doação de R$25,00 de Maria Clara',
      timeLabel: '25/10/2023',
      isNew: false,
      confirmed: true,
    },
  ];

  get hasNotifications(): boolean {
    return this.notifications.length > 0;
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, isNew: false }));
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  confirm(notification: DonationNotification): void {
    notification.confirmed = true;
    notification.isNew = false;
    console.log('Doação confirmada:', notification);
  }
}
