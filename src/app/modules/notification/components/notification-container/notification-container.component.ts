import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { INotification } from '../../interfaces/i-notification';
import { animationStagger } from 'src/app/animations/stagger.animation';
import { growIn } from 'src/app/animations/grow-in.animation';

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.scss',
  animations: [growIn, animationStagger],
})
export class NotificationContainerComponent implements OnInit {
  public globalNotifications!: INotification[];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.globalNotifications$.subscribe(
      (res: INotification[]) => {
        this.globalNotifications = res;
      }
    );
  }

}
