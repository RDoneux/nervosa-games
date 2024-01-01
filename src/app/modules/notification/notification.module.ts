import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationContainerComponent } from './components/notification-container/notification-container.component';

@NgModule({
  declarations: [NotificationComponent, NotificationContainerComponent],
  imports: [CommonModule],
  exports: [NotificationContainerComponent]
})
export class NotificationModule {}
