import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { mockedCartItem } from 'src/app/data/test-data.spec';
import { skip } from 'rxjs';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#addCartItem', () => {
    it('should do nothing if product is already in cart', () => {
      service.cartItems = [{ ...mockedCartItem, id: 'test-id' }];
      spyOn(service.cartItems, 'push');

      service.addCartItem({ ...mockedCartItem, id: 'test-id' });

      expect(service.cartItems.push).not.toHaveBeenCalled();
    });

    it('should push new item to cartItem array and trigger price and cart items observable', () => {
      spyOn(service.cartItems, 'push');

      service
        .getCartItems$()
        .pipe(skip(1))
        .subscribe((res) => expect(res).toEqual([mockedCartItem]));
      service
        .getPrice$()
        .pipe(skip(1))
        .subscribe((res) => expect(res).toEqual(2));

      service.addCartItem(mockedCartItem);

      expect(service.cartItems.push).toHaveBeenCalledOnceWith(mockedCartItem);
    });
  });

  describe('#updateCartItem', () => {
    it('should do nothing if requested cart item does not exist', () => {
      service.updateCartItem(mockedCartItem);
      expect(service.cartItems).toEqual([]);
    });
    it('should update corresponding cartitem', () => {
      const updatedMockedCartItem = {
        ...mockedCartItem,
        title: 'updated-cart-item-title',
        price: 23,
      };
      service.cartItems = [mockedCartItem];

      service
        .getCartItems$()
        .pipe(skip(1))
        .subscribe((res) => expect(res).toEqual([updatedMockedCartItem]));
      service
        .getPrice$()
        .pipe(skip(1))
        .subscribe((res) => expect(res).toEqual(23));

      service.updateCartItem(updatedMockedCartItem);

      expect(service.cartItems).toEqual([updatedMockedCartItem]);
    });
  });

  describe('#removeCartItem', () => {
    it('should remove cartItem with corresponding id from cartItems and emit new price and cartItem array', () => {
      service.cartItems = [mockedCartItem];

      service
        .getCartItems$()
        .pipe(skip(1))
        .subscribe((res) => expect(res).toEqual([]));
      service
        .getPrice$()
        .pipe(skip(1))
        .subscribe((res) => expect(res).toEqual(0));

      service.removeCartItem(mockedCartItem);

      expect(service.cartItems).toEqual([]);
    });
  });

  describe('#calculateProductPriceIncludingQuantity', () => {
    it('should correctly calculate price when quantity is 1', () => {
      const item = { ...mockedCartItem, price: 1, quantity: 1 };

      expect(service.calculateProductPriceIncludingQuantity(item)).toEqual(1);
    });
    it('should correctly calculate price when quantity is 5', () => {
      const item = { ...mockedCartItem, price: 1, quantity: 5 };

      expect(service.calculateProductPriceIncludingQuantity(item)).toEqual(5);
    });
    it('should correctly calculate price when quantity is 17', () => {
      const item = { ...mockedCartItem, price: 1, quantity: 17 };

      expect(service.calculateProductPriceIncludingQuantity(item)).toEqual(17);
    });
    it('should correctly calculate price when price is 3 and quantity is 1', () => {
      const item = { ...mockedCartItem, price: 3, quantity: 1 };

      expect(service.calculateProductPriceIncludingQuantity(item)).toEqual(3);
    });
    it('should correctly calculate price when price is 3 and quantity is 3', () => {
      const item = { ...mockedCartItem, price: 3, quantity: 3 };

      expect(service.calculateProductPriceIncludingQuantity(item)).toEqual(9);
    });
  });
});
