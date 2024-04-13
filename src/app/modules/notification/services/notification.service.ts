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
  private question: Subject<boolean> | undefined = undefined;

  public readonly globalNotifications$: Observable<INotification[]> =
    this._globalNotifications.asObservable();

  constructor() {}

  showNotification(
    title: string,
    type: NotificationType,
    timer?: number,
    id?: string
  ): void {
    this.notifications.push({ title, type, id: id ? id : v4(), timer });
    this._globalNotifications.next(this.notifications);
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(
      (notification: INotification) => notification.id !== id
    );
    this._globalNotifications.next(this.notifications);
  }

  askBinaryQuestion(
    title: string,
    yesLabel: string = 'Yes',
    noLabel: string = 'No'
  ): Observable<boolean> {
    if(this.question) return this.question;
    this.question = new Subject();
    this.notifications.push({
      title,
      type: NotificationType.ARE_YOU_SURE,
      id: v4(),
      yesLabel: yesLabel,
      noLabel: noLabel,
    });
    this._globalNotifications.next(this.notifications);
    return this.question;
  }

  answerQuestion(response: boolean, id: string): void {
    if(!this.question) return;
    this.question.next(response)
    this.question = undefined;
    this.removeNotification(id)
  }

}
