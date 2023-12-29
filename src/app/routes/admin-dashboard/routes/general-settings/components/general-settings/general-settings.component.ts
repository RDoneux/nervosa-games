import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IStoreGeneralSettings } from 'src/app/interfaces/i-store-general-settings.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrl: './general-settings.component.scss',
})
export class GeneralSettingsComponent implements OnInit {
  public storeGeneralSettings!: IStoreGeneralSettings;

  constructor(private firestoreService: FirestoreService) {}

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
    this.firestoreService
      .getFirestore()
      .collection('general-settings')
      .doc<IStoreGeneralSettings>('store')
      .update(this.storeGeneralSettings);
    form.reset();
  }
}
