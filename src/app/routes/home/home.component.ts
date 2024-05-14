import { Component, OnInit } from '@angular/core';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';
import { IGeneralSettings } from 'src/app/interfaces/i-general-settings.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  redirectUrl!: string;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collection('general')
      .doc<IGeneralSettings>('settings')
      .valueChanges()
      .subscribe({
        next: (res: IGeneralSettings | undefined) => {
          this.redirectUrl = res?.sumupStoreURL ?? '/';
        },
      });
  }
}
