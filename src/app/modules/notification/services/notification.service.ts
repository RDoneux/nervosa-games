import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INotification, NotificationType } from '../interfaces/i-notification';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _globalNotifications: Subject<INotification[]> = new Subject();
  private notifications: INotification[] = [];

  public readonly globalNotifications$: Observable<INotification[]> =
    this._globalNotifications.asObservable();

  constructor() {}

  showNotification(
    title: string,
    type: NotificationType,
    timer?: number
  ): void {
    this.notifications.push({ title, type, id: v4(), timer });
    this._globalNotifications.next(this.notifications);
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(
      (notification: INotification) => notification.id !== id
    );
    this._globalNotifications.next(this.notifications);
  }
}
