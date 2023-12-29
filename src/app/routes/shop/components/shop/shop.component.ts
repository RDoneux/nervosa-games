import { Component, OnInit } from '@angular/core';
import { IStoreGeneralSettings } from 'src/app/interfaces/i-store-general-settings.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private firestoreService: FirestoreService) {}

  redirectToSumupStore: boolean = true;
  redirectUrl!: string;

  /* istanbul ignore next */
  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collection('general-settings')
      .doc<IStoreGeneralSettings>('store')
      .valueChanges()
      .subscribe({
        next: (res: IStoreGeneralSettings | undefined) => {
          this.redirectToSumupStore = res?.redirectToSumupStore ?? true;
          this.redirectUrl = res?.sumupStoreURL ?? '/'
          this.shouldRedirect(res);
        },
      });
  }

  /* istanbul ignore next */
  shouldRedirect(generalSettings: IStoreGeneralSettings | undefined): void {
    if (generalSettings?.redirectToSumupStore) {
      // site is configured to redirect to the sumup store
      if (window.history.state.navigationId > 1) {
        if (generalSettings.openInNewTab) {
          window.open(generalSettings.sumupStoreURL, '_blank');
        } else {
          window.location.href = generalSettings.sumupStoreURL;
        }
      } else {
        window.location.href = '/';
      }
    }
  }
}
