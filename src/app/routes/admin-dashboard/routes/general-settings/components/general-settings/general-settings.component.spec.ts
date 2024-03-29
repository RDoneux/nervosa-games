import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingsComponent } from './general-settings.component';
import { GeneralSettingsModule } from '../../general-settings.module';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { NgForm } from '@angular/forms';
import { IGeneralSettings } from 'src/app/interfaces/i-general-settings.interface';

describe('GeneralSettingsComponent', () => {
  let component: GeneralSettingsComponent;
  let fixture: ComponentFixture<GeneralSettingsComponent>;

  let firestoreStub: any;

  const payload: IGeneralSettings = {
    redirectToSumupStore: true,
    sumupStoreURL: 'test-sumupstore-url',
    openInNewTab: false,
    contactFormDestinationAddress: 'test-destination-address',
  };

  beforeEach(async () => {
    firestoreStub = getFirestoreStub(payload);
    await TestBed.configureTestingModule({
      imports: [GeneralSettingsModule],
      providers: [
        {
          provide: FirestoreService,
          useValue: firestoreStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralSettingsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should request correct data from firestore service', () => {
      component.ngOnInit();

      expect(firestoreStub.getFirestore().collection).toHaveBeenCalledOnceWith(
        'general-settings'
      );
      expect(
        firestoreStub.getFirestore().collection().doc
      ).toHaveBeenCalledOnceWith('store');
      expect(
        firestoreStub.getFirestore().collection().doc().valueChanges
      ).toHaveBeenCalledTimes(1);

      expect(component.storeGeneralSettings).toEqual(payload);
    });
  });

  describe('#onSubmit', () => {
    it('should update correct firestore collection', () => {
      component.storeGeneralSettings = payload;

      component.onSubmit({ reset: () => {} } as NgForm);

      expect(firestoreStub.getFirestore().collection).toHaveBeenCalledOnceWith(
        'general-settings'
      );
      expect(
        firestoreStub.getFirestore().collection().doc
      ).toHaveBeenCalledOnceWith('store');
      expect(
        firestoreStub.getFirestore().collection().doc().update
      ).toHaveBeenCalledOnceWith(payload);
    });

    it('should reset form', () => {
      const resetFunction = { reset: jest.fn() };

      component.onSubmit(resetFunction as unknown as NgForm);

      expect(resetFunction.reset).toHaveBeenCalledTimes(1);
    });
  });
});
