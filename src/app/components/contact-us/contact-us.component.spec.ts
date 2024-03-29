import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { RecaptchaService } from 'src/app/services/recaptcha/recaptcha.service';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  let firestoreServiceMock = getFirestoreStub({})
  let recaptchaServiceMock = {checkRecapthaKey: jest.mock}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsComponent],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock},
        { provide: RecaptchaService, useValue: recaptchaServiceMock}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
