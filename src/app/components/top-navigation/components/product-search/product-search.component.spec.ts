import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { IGeneralSettings } from 'src/app/interfaces/i-general-settings.interface';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { TopNavigationModule } from '../../top-navigation.module';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  let payload: IGeneralSettings = {
    redirectToSumupStore: true,
    sumupStoreURL: 'test-sumup-store-url',
    openInNewTab: true,
    contactFormDestinationAddress: 'test-destination-address',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TopNavigationModule],
      providers: [
        { provide: FirestoreService, useValue: getFirestoreStub(payload) },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;

    component.socialMediaIconLinks = [
      { href: 'test-href', name: 'test-name', alt: 'test-alt' },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onKeyPress', () => {
    it('should open given url if redirectToSumupStore is true', () => {
      component.searchTerm = 'test-search-term';
      jest.spyOn(window, 'open').mockImplementation();

      component.ngOnInit();

      component.onKeyPress({ key: 'Enter' } as KeyboardEvent);

      expect(window.open).toHaveBeenCalledWith(
        `${payload.sumupStoreURL}/search?search=test-search-term`,
        '_blank'
      );
    });
  });
});
