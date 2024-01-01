import { Component, Input, OnInit } from '@angular/core';
import { INotification } from '../../interfaces/i-notification';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  @Input({ required: true }) notification!: INotification;

  public timeLeft!: number;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    if (this.notification.timer) {
      this.timeLeft = this.notification.timer
      const interval = setInterval(() => {
        (this.timeLeft as number) -= 10;
        if ((this.timeLeft as number) <= 0) {
          this.onClose();
          clearInterval(interval);
        }
      }, 10);
    }
  }

  onClose(): void {
    this.notificationService.removeNotification(this.notification.id as string);
  }
}
