import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductModule } from '../../product.module';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { mockedCartItem, mockedProduct } from 'src/app/data/test-data';
import { UserService } from 'src/app/services/user/user.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { IGeneralSettings } from 'src/app/interfaces/i-general-settings.interface';
import { IProduct } from '../../interfaces/i-product.interface';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let firestoreServiceMock: any;

  let userServiceMock: {addProductToLikedList: jest.Mock, removeProductFromLikedList: jest.Mock}
  let cartServiceMock: {addCartItem: jest.Mock}

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub('');
    userServiceMock = {
      'addProductToLikedList': jest.fn(),
      'removeProductFromLikedList': jest.fn()
    };
    cartServiceMock = {
      'addCartItem': jest.fn()
    };
    TestBed.configureTestingModule({
      imports: [ProductModule],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onShowMoreDetail', () => {
    it('should set showMoreDetails to true', () => {
      component.showMoreDetails = false;
      component.onShowMoreDetail();
      expect(component.showMoreDetails).toBeTruthy();
    });
  });

  describe('#onRequestClose', () => {
    it('should set showMoreDetails to false', () => {
      component.showMoreDetails = true;
      component.onRequestClose();
      expect(component.showMoreDetails).toBeFalsy();
    });
  });

  describe('#onFavorite', () => {
    beforeEach(() => {
      component.product = mockedProduct;
    });
    it('should switch product.isLiked value', () => {
      component.product.isLiked = false;

      component.onFavorite();

      expect(component.product.isLiked).toBeTruthy();

      component.onFavorite();

      expect(component.product.isLiked).toBeFalsy();
    }),
      it('should call userService #addProductToLikedList if product is liked', () => {
        component.product.isLiked = false;

        component.onFavorite();

        expect(userServiceMock.addProductToLikedList).toHaveBeenCalledWith(
          mockedProduct.id
        );
        expect(
          userServiceMock.removeProductFromLikedList
        ).not.toHaveBeenCalled();
      }),
      it('should call userService #removeProductFromLikedList if product is not liked', () => {
        component.product.isLiked = true;

        component.onFavorite();

        expect(
          userServiceMock.removeProductFromLikedList
        ).toHaveBeenCalledWith(mockedProduct.id);
        expect(userServiceMock.addProductToLikedList).not.toHaveBeenCalled();
      });
  });

  describe('#onAddToCart', () => {
    it('should call CartService #addCartItem', () => {
      component.product = mockedCartItem;
      component.onAddToCart();

      expect(cartServiceMock.addCartItem).toHaveBeenCalledWith(
        mockedCartItem
      );
    });
  });

  describe('#onClick', () => {
    beforeEach(() => {
      jest.spyOn(window, 'open').mockImplementation();
    });
    it('should do nothing if store general settings is false or if openInNewTab is false', () => {
      component.storeGeneralSettings = undefined;

      component.onClick();

      expect(window.open).not.toHaveBeenCalled();

      component.storeGeneralSettings = {
        openInNewTab: false,
      } as IGeneralSettings;

      component.onClick();

      expect(window.open).not.toHaveBeenCalled();
    });

    it('should call window open with given url and product title', () => {
      component.storeGeneralSettings = {
        openInNewTab: true,
        sumupStoreURL: 'test-url',
        redirectToSumupStore: true,
        contactFormDestinationAddress: 'test-destination-address'
      };
      component.product = { title: 'Test Title' } as IProduct;

      component.onClick();

      expect(window.open).toHaveBeenCalledWith(
        'test-url/product/test-title',
        '_blank'
      );
    });

    it('should not redirect to new tab if setting requests open in current tab', () => {
      component.storeGeneralSettings = {
        openInNewTab: false,
        sumupStoreURL: 'test-url',
        redirectToSumupStore: true,
        contactFormDestinationAddress: 'test-destination-address'
      };
      component.product = { title: 'Test Title' } as IProduct;

      component.onClick();

      expect(window.open).toHaveBeenCalledWith(
        'test-url/product/test-title',
        ''
      );
    });
  });
});
