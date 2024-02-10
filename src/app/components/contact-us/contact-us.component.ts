import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
} from 'ng-recaptcha';
import { of } from 'rxjs';
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
export class ContactUsComponent {
  constructor(
    private firestoreService: FirestoreService,
    private notificationService: NotificationService
  ) {}

  token: string | undefined;

  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  public send(form: NgForm): void {
    if (form.valid) {
      of(
        this.firestoreService.getFirestore().collection('emails').add({
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
        })
      ).subscribe({
        next: () =>
          this.notificationService.showNotification(
            'Message sent successfully',
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
      this.reset();
    }
  }

  reset(): void {
    this.token = undefined;
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
