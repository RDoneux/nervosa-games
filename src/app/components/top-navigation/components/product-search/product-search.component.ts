import { Component, Input, OnInit } from '@angular/core';
import { ISocialMediaIconLink } from '../../interfaces/i-social-media-icon-link.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IStoreGeneralSettings } from 'src/app/interfaces/i-store-general-settings.interface';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  @Input({ required: true }) socialMediaIconLinks: ISocialMediaIconLink[] = [];

  public searchTerm!: string;

  private storeGeneralSettings!: IStoreGeneralSettings;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collection('general-settings')
      .doc<IStoreGeneralSettings>('store')
      .valueChanges()
      .subscribe({
        next: (res: IStoreGeneralSettings | undefined) => {
          if (res) this.storeGeneralSettings = res;
        },
      });
  }

  onKeyPress(keyPress: KeyboardEvent) {
    if (keyPress.key === 'Enter') {
      if (this.storeGeneralSettings.redirectToSumupStore) {
        window.open(
          `${this.storeGeneralSettings.sumupStoreURL}/search?search=${this.searchTerm}`,
          '_blank'
        );
      } else {
        
        // handle the search internally
      }
      this.searchTerm = '';
    }
  }
}
