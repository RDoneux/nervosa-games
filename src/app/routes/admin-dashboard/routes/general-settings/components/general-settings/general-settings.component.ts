import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { IStoreGeneralSettings } from 'src/app/interfaces/i-store-general-settings.interface';
import { NotificationType } from 'src/app/modules/notification/interfaces/i-notification';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss',
})
export class GeneralSettingsComponent implements OnInit {
  public storeGeneralSettings!: IStoreGeneralSettings;

  constructor(
    private firestoreService: FirestoreService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collection('general-settings')
      .doc<IStoreGeneralSettings>('store')
      .valueChanges()
      .subscribe({
        next: (res: IStoreGeneralSettings | undefined) => {
          if (res) {
            this.storeGeneralSettings = res;
          }
        },
      });
  }

  onSubmit(form: NgForm): void {
    from(
      this.firestoreService
        .getFirestore()
        .collection('general-settings')
        .doc<IStoreGeneralSettings>('store')
        .update(this.storeGeneralSettings)
    ).subscribe({
      next: () => {
        this.notificationService.showNotification(
          'Settings successfully updated',
          NotificationType.SUCCESS,
          5000
        );
      },
      error: (error: Error) => {
        this.notificationService.showNotification(
          `There was an error updating the settings. ${error.message}`,
          NotificationType.DANGER
        );
      },
    });
    form.reset();
  }
}
