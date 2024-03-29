import { TestBed } from '@angular/core/testing';

import { User } from 'firebase/auth';
import { mockedUser } from 'src/app/data/test-data.spec';
import { FirestoreService } from '../firestore/firestore.service';
import { getFirestoreStub } from '../firestore/firestore-testing';
import { of } from 'rxjs';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let firestoreServiceMock: any = getFirestoreStub('');

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
      jest.spyOn(service, 'submitLoginDetails').mockImplementation(() => {});
      service.loginSuccess(mockedUser as unknown as User);
    });
    it('should call submit details with user', () => {
      jest.spyOn(service, 'submitLoginDetails').mockImplementation(() => {});
      service.loginSuccess(mockedUser as unknown as User);

      expect(service.submitLoginDetails).toHaveBeenCalledWith(
        mockedUser as unknown as User
      );
    });
  });

  describe('#updateOrCreateNervosaGamesUser', () => {
    it('should request users collection from firestore', () => {
      jest.spyOn(service, 'generateNervosaUserFromGoogleUser').mockReturnValue(
        of(mockedUser)
      );
      service.updateOrCreateNervosaGamesUser(mockedUser as unknown as User);

      expect(firestoreServiceMock.getFirestore).toHaveBeenCalled();
      expect(firestoreServiceMock.getFirestore().collection).toHaveBeenCalled();
      expect(
        firestoreServiceMock.getFirestore().collection().valueChanges
      ).toHaveBeenCalled();
    });

    it('should call #generateNervosaUserFromGoogleUser if returned IUser is null', () => {
      jest.spyOn(service, 'generateNervosaUserFromGoogleUser').mockReturnValue(
        of(mockedUser)
      );

      service.updateOrCreateNervosaGamesUser(mockedUser as unknown as User);

      expect(
        service.generateNervosaUserFromGoogleUser
      ).toHaveBeenCalledOnceWith(mockedUser as unknown as User);
    });

    it('should call #saveUserToDatabase with generated IUser if return IUser is null', () => {
      jest.spyOn(service, 'generateNervosaUserFromGoogleUser').mockReturnValue(
        of(mockedUser)
      );
      jest.spyOn(service, 'saveUserToDatabase').mockImplementation(() => {});

      service.updateOrCreateNervosaGamesUser(mockedUser as unknown as User);

      expect(service.saveUserToDatabase).toHaveBeenCalledOnceWith(mockedUser);
    });

    it('should emit generated IUser if returned IUser is null', () => {
      jest.spyOn(service, 'generateNervosaUserFromGoogleUser').mockReturnValue(
        of(mockedUser)
      );
      jest.spyOn(service, 'saveUserToDatabase').mockImplementation(() => {});

      service
        .updateOrCreateNervosaGamesUser(mockedUser as unknown as User)
        .subscribe((res) => expect(res).toEqual(mockedUser));
    });

    it('should call #updateExistingNervosaUserFromGoogleUser if returned IUser is defined', () => {
      firestoreServiceMock
        .getFirestore()
        .collection()
        .valueChanges.mockReturnValue(of([mockedUser]));
      jest.spyOn(service, 'updateExistingNervosaUserFromGoogleUser').mockReturnValue(
        of(mockedUser)
      );

      service.updateOrCreateNervosaGamesUser(mockedUser as unknown as User);

      expect(
        service.updateExistingNervosaUserFromGoogleUser
      ).toHaveBeenCalledOnceWith(mockedUser as unknown as User, mockedUser);
    });

    it('should call #saveUserToDatabase with returned IUser if return IUser is defined', () => {
      firestoreServiceMock
        .getFirestore()
        .collection()
        .valueChanges.mockReturnValue(of([mockedUser]));
      jest.spyOn(service, 'updateExistingNervosaUserFromGoogleUser').mockReturnValue(
        of(mockedUser)
      );

      jest.spyOn(service, 'saveUserToDatabase').mockImplementation(() => {});

      service.updateOrCreateNervosaGamesUser(mockedUser as unknown as User);

      expect(service.saveUserToDatabase).toHaveBeenCalledOnceWith(mockedUser);
    });

    it('should emit returned IUser if returned IUser is defined', () => {
      firestoreServiceMock
        .getFirestore()
        .collection()
        .valueChanges.mockReturnValue(of([mockedUser]));
      jest.spyOn(service, 'updateExistingNervosaUserFromGoogleUser').mockReturnValue(
        of(mockedUser)
      );

      jest.spyOn(service, 'saveUserToDatabase').mockImplementation(() => {});

      service
        .updateOrCreateNervosaGamesUser(mockedUser as unknown as User)
        .subscribe((res) => expect(res).toEqual(mockedUser));
    });
  });

  describe('#generateNervosaUserFromGoogleUser', () => {
    const adminList: { administrators: string[] } = {
      administrators: ['test-email'],
    };

    const user: User = {
      displayName: 'test-display-name',
      photoURL: 'test-photo-url',
      email: 'test-email',
      uid: 'test-id',
    } as User;

    let getAdminListSpy: jasmine.Spy;

    beforeEach(() => {
      getAdminListSpy = jest.spyOn(service, 'getAdminList').mockReturnValue(
        of(adminList)
      );
    });

    it('should call #getAdminList', () => {
      service.generateNervosaUserFromGoogleUser(user);

      expect(service.getAdminList).toHaveBeenCalledTimes(1);
    });

    it('should emit IUser', () => {
      service.generateNervosaUserFromGoogleUser(user).subscribe((res) => {
        expect(res.displayName).toEqual('test-display-name');
        expect(res.profilePicture).toEqual('test-photo-url');
        expect(res.email).toEqual('test-email');
        expect(res.id).toEqual('test-id');
        expect(res.likedProducts).toEqual([]);
      });
    });

    it('should return IUser with isAdmin true if user email is in administrators list', () => {
      service.generateNervosaUserFromGoogleUser(user).subscribe((res) => {
        expect(res.isAdmin).toBeTrue();
      });
    });

    it('should return IUser with isAdmin false if user email is in administrators list', () => {
      service
        .generateNervosaUserFromGoogleUser({
          ...user,
          email: 'not-admin-email',
        })
        .subscribe((res) => {
          expect(res.isAdmin).toBeFalse();
        });
    });

    it('should set displayName and email to "unknown" if User corresponding fields are null', () => {
      service
        .generateNervosaUserFromGoogleUser({
          ...user,
          email: null,
          displayName: null,
        })
        .subscribe((res) => {
          expect(res.displayName).toEqual('unknown');
          expect(res.profilePicture).toEqual('test-photo-url');
          expect(res.email).toEqual('unknown');
          expect(res.id).toEqual('test-id');
          expect(res.likedProducts).toEqual([]);
        });
    });

    it('should set isAdmin to false if adminList is null', () => {
      getAdminListSpy.mockReturnValue(of(undefined));

      service
        .generateNervosaUserFromGoogleUser({
          ...user,
          email: null,
          displayName: null,
        })
        .subscribe((res) => {
          expect(res.isAdmin).toBeFalse();
        });
    });
  });

  describe('#updateExistingNervosaUserFromGoogleUser', () => {
    const adminList: { administrators: string[] } = {
      administrators: ['user-test-email'],
    };

    const user: User = {
      displayName: 'user-test-display-name',
      photoURL: 'user-test-photo-url',
      email: 'user-test-email',
      uid: 'user-test-id',
    } as User;

    let getAdminListSpy: jasmine.Spy;

    beforeEach(() => {
      getAdminListSpy = jest.spyOn(service, 'getAdminList').mockReturnValue(
        of(adminList)
      );
    });

    it('should call #getAdminList', () => {
      service.updateExistingNervosaUserFromGoogleUser(user, mockedUser);

      expect(service.getAdminList).toHaveBeenCalledTimes(1);
    });

    it('should emit IUser with values from user', () => {
      service
        .updateExistingNervosaUserFromGoogleUser(user, mockedUser)
        .subscribe((res) => {
          expect(res.displayName).not.toEqual('mock-user-display-name');
          expect(res.profilePicture).not.toEqual('mock-user-profile-picture');
          expect(res.email).not.toEqual('test-user-email');
          expect(res.id).not.toEqual('mock-user-id');

          expect(res.displayName).toEqual('user-test-display-name');
          expect(res.profilePicture).toEqual('user-test-photo-url');
          expect(res.email).toEqual('user-test-email');
          expect(res.id).toEqual('user-test-id');
        });
    });

    it('should return IUser with isAdmin true if user email is in administrators list', () => {
      service
        .updateExistingNervosaUserFromGoogleUser(user, mockedUser)
        .subscribe((res) => {
          expect(res.isAdmin).toBeTrue();
        });
    });

    it('should return IUser with isAdmin false if user email is in administrators list', () => {
      service
        .updateExistingNervosaUserFromGoogleUser(
          {
            ...user,
            email: 'not-admin-email',
          },
          mockedUser
        )
        .subscribe((res) => {
          expect(res.isAdmin).toBeFalse();
        });
    });

    it('should set displayName and email to "unknown" if User corresponding fields are null', () => {
      service
        .updateExistingNervosaUserFromGoogleUser(
          {
            ...user,
            email: null,
            displayName: null,
          },
          mockedUser
        )
        .subscribe((res) => {
          expect(res.displayName).toEqual('unknown');
          expect(res.profilePicture).toEqual('user-test-photo-url');
          expect(res.email).toEqual('unknown');
          expect(res.id).toEqual('user-test-id');
        });
    });

    it('should set isAdmin to false if adminList is null', () => {
      getAdminListSpy.mockReturnValue(of(undefined));

      service
        .updateExistingNervosaUserFromGoogleUser(
          {
            ...user,
            email: null,
            displayName: null,
          },
          mockedUser
        )
        .subscribe((res) => {
          expect(res.isAdmin).toBeFalse();
        });
    });
  });
});
