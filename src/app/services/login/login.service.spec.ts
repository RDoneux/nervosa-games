import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

import { User } from 'firebase/auth';
import { mockedUser } from 'src/app/data/test-data.spec';
import { getFirestoreStub } from '../firestore/firestore-testing';
import { FirestoreService } from '../firestore/firestore.service';

describe('LoginService', () => {
  let service: LoginService;
  let firestoreServiceMock: any;

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loginRequests', () => {
    it('return loginRequests', () => {
      expect(service.loginRequests()).toBeDefined();
    });
  });

  describe('#loginDetails', () => {
    it('return loginDetails', () => {
      expect(service.loginDetails()).toBeDefined();
    });
  });

  describe('#loginSuccess', () => {
    it('should call _loginRequests with CLOSE', () => {
      service.loginRequests().subscribe({
        next: (state: 'OPEN' | 'CLOSE') => expect(state).toEqual('CLOSE'),
      });
      spyOn(service, 'submitLoginDetails');
      service.loginSuccess(mockedUser as unknown as User);
    });
    it('should call submit details with user', () => {
      spyOn(service, 'submitLoginDetails');
      service.loginSuccess(mockedUser as unknown as User);

      expect(service.submitLoginDetails).toHaveBeenCalledWith(
        mockedUser as unknown as User
      );
    });
  });
});
