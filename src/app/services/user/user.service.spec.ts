import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { LoginService } from '../login/login.service';
import { mockedUser } from 'src/app/data/test-data';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let loginServiceMock: {getCurrentLoggedInUser: jest.Mock, saveUserToDatabase: jest.Mock}

  beforeEach(() => {
    loginServiceMock = {
      'getCurrentLoggedInUser': jest.fn(),
      'saveUserToDatabase': jest.fn()
    };
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
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(mockedUser));
    });

    it('should return userLikedProducts', () => {
      service
        .getUserProductLikedList()
        .subscribe((res) => expect(res).toEqual(mockedUser.likedProducts));
    });

    it('should return null if user is undefined', () => {
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(null));
      service
        .getUserProductLikedList()
        .subscribe((res) => expect(res).toBeNull());
    });
  });

  describe('#addProductToLikedList', () => {
    beforeEach(() => {
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(mockedUser));
    });

    it('should request #currentLoggedInUser from loginService', () => {
      service.addProductToLikedList('new-testing-liked-list-item');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).toHaveBeenCalledWith({
        ...mockedUser,
      });
    });

    it('should do nothing if returned user is null', () => {
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(null));

      service.addProductToLikedList('new-testing-liked-list-item');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).not.toHaveBeenCalled();
    });
  });

  describe('#removeProductFromLikedList', () => {
    beforeEach(() => {
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(mockedUser));
    });

    it('should request #currentLoggedInUser from loginService', () => {
      service.removeProductFromLikedList('liked-product-one');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).toHaveBeenCalledWith({
        ...mockedUser,
      });
    });

    it('should do nothing if returned user is null', () => {
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(null));

      service.removeProductFromLikedList('liked-product-one');

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
      expect(loginServiceMock.saveUserToDatabase).not.toHaveBeenCalled();
    });
  });
});
