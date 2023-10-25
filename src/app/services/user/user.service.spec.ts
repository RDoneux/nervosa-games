import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { LoginService } from '../login/login.service';
import { mockedUser } from 'src/app/data/test-data.spec';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let loginServiceMock: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    loginServiceMock = jasmine.createSpyObj('LoginService', [
      'getCurrentLoggedInUser',
      'saveUserToDatabase',
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: LoginService, useValue: loginServiceMock }],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUserProductLikedList', () => {
    beforeEach(() => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(mockedUser));
    });

    it('should return userLikedProducts', () => {
      service
        .getUserProductLikedList()
        .subscribe((res) => expect(res).toEqual(mockedUser.likedProducts));
    });

    it('should return null if user is undefined', () => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(null));
      service
        .getUserProductLikedList()
        .subscribe((res) => expect(res).toBeNull());
    });
  });

  describe('#addProductToLikedList', () => {
    beforeEach(() => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(mockedUser));
    });

    it('should request #currentLoggedInUser from loginService', () => {
      service.addProductToLikedList('new-testing-liked-list-item');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).toHaveBeenCalledOnceWith({
        ...mockedUser,
      });
    });

    it('should do nothing if returned user is null', () => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(null));

      service.addProductToLikedList('new-testing-liked-list-item');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).not.toHaveBeenCalled();
    });
  });

  describe('#removeProductFromLikedList', () => {
    beforeEach(() => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(mockedUser));
    });

    it('should request #currentLoggedInUser from loginService', () => {
      service.removeProductFromLikedList('liked-product-one');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).toHaveBeenCalledOnceWith({
        ...mockedUser,
      });
    });

    it('should do nothing if returned user is null', () => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(null));

      service.removeProductFromLikedList('liked-product-one');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).not.toHaveBeenCalled();
    });
  });
});
