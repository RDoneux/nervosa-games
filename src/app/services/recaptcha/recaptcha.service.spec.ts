import { TestBed } from '@angular/core/testing';

import { RecaptchaService } from './recaptcha.service';
import { HttpClient } from '@angular/common/http';
import { getFirestoreStub } from '../firestore/firestore-testing';
import { FirestoreService } from '../firestore/firestore.service';

describe('RecaptchaService', () => {
  let service: RecaptchaService;

  let httpClientMock: { post: jest.Mock };
  let firestoreServiceMock = getFirestoreStub('');

  beforeEach(() => {
    httpClientMock = { post: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientMock },
        { provide: FirestoreService, useValue: firestoreServiceMock },
      ],
    });
    service = TestBed.inject(RecaptchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
