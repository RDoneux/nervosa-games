import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
} from 'ng-recaptcha';
import { of } from 'rxjs';
import { IGeneralSettings } from 'src/app/interfaces/i-general-settings.interface';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    FormsModule,
    UserInterfaceModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    { provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.siteKey } },
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit {
  constructor(
    private firestoreService: FirestoreService,
    private notificationService: NotificationService
  ) {}

  emailDestination: string | undefined;

  token: string | undefined;

  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collection('general')
      .doc<IGeneralSettings>('settings')
      .valueChanges()
      .subscribe({
        next: (settings: IGeneralSettings | undefined) =>
          (this.emailDestination = settings?.contactFormDestinationAddress),
        error: () =>
          this.notificationService.showNotification(
            'Error loading page',
            'danger'
          ),
      });
  }

  public send(form: NgForm): void {
    if (!this.emailDestination) {
      this.notificationService.showNotification(
        "We're sorry, but there is a problem sending your request. Please try again later",
        'danger'
      );
    }
    if (form.valid) {
      of(
        this.firestoreService
          .getFirestore()
          .collection('mail')
          .add({
            to: this.emailDestination,
            from: this.email,
            sender: this.name,
            message: {
              subject: `New Message from: ${this.name} | RE: ${this.subject}`,
              text: `Sender: ${this.email}
              
              ${this.message}`,
            },
          })
      ).subscribe({
        next: () =>
          this.notificationService.showNotification(
            'Message sent successfully. We will get back to you as soon as we can.',
            'success',
            5000
          ),
        error: () =>
          this.notificationService.showNotification(
            'Error sending message',
            'danger',
            5000
          ),
      });
      form.resetForm();
    }
  }
}
