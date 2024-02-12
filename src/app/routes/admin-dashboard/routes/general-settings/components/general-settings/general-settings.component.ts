import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { IGeneralSettings } from 'src/app/interfaces/i-general-settings.interface';
import { NotificationType } from 'src/app/modules/notification/interfaces/i-notification';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss',
})
export class GeneralSettingsComponent implements OnInit {
  public storeGeneralSettings!: IGeneralSettings;

  constructor(
    private firestoreService: FirestoreService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collection('general')
      .doc<IGeneralSettings>('settings')
      .valueChanges()
      .subscribe({
        next: (res: IGeneralSettings | undefined) => {
          if (res) {
            this.storeGeneralSettings = res;
          }
        },
      });
  }

  onSubmit(form: NgForm): void {
    of(
      this.firestoreService
        .getFirestore()
        .collection('general')
        .doc<IGeneralSettings>('settings')
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
