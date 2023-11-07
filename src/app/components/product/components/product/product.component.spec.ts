import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductModule } from '../../product.module';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { mockedCartItem, mockedProduct } from 'src/app/data/test-data.spec';
import { UserService } from 'src/app/services/user/user.service';
import { CartService } from 'src/app/services/cart/cart.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let firestoreServiceMock: any;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let cartServiceMock: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub('');
    userServiceMock = jasmine.createSpyObj('UserService', [
      'addProductToLikedList',
      'removeProductFromLikedList',
    ]);
    cartServiceMock = jasmine.createSpyObj('CartService', ['addCartItem']);
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
      expect(component.showMoreDetails).toBeTrue();
    });
  });

  describe('#onRequestClose', () => {
    it('should set showMoreDetails to false', () => {
      component.showMoreDetails = true;
      component.onRequestClose();
      expect(component.showMoreDetails).toBeFalse();
    });
  });

  describe('#onFavorite', () => {
    beforeEach(() => {
      component.product = mockedProduct;
    });
    it('should switch product.isLiked value', () => {
      component.product.isLiked = false;

      component.onFavorite();

      expect(component.product.isLiked).toBeTrue();

      component.onFavorite();

      expect(component.product.isLiked).toBeFalse();
    }),
      it('should call userService #addProductToLikedList if product is liked', () => {
        component.product.isLiked = false;

        component.onFavorite();

        expect(userServiceMock.addProductToLikedList).toHaveBeenCalledOnceWith(
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
        ).toHaveBeenCalledOnceWith(mockedProduct.id);
        expect(userServiceMock.addProductToLikedList).not.toHaveBeenCalled();
      });
  });

  describe('#onAddToCart', () => {
    it('should call CartService #addCartItem', () => {
      component.product = mockedCartItem;
      component.onAddToCart();

      expect(cartServiceMock.addCartItem).toHaveBeenCalledOnceWith(mockedCartItem);
    })
  })
});
