import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { CheckoutModule } from '../../checkout.module';
import { QuantitySelectorComponent } from 'src/app/components/quantity-selector/quantity-selector.component';
import { mockedProduct } from 'src/app/data/test-data.spec';
import { CartService } from 'src/app/services/cart/cart.service';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  let cartServiceMock: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    cartServiceMock = {
      'calculateProductPriceIncludingQuantity': jest.fn(),
      'updateCartItem': jest.fn(),
      'removeCartItem': jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [CheckoutModule, QuantitySelectorComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    });
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.cartItem = { ...mockedProduct, quantity: 1 };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOninit', () => {
    it('should call CartService #calculateProductPriceIncludingQuantity', () => {
      cartServiceMock.calculateProductPriceIncludingQuantity.mockReturnValue(1);

      component.ngOnInit();

      expect(
        cartServiceMock.calculateProductPriceIncludingQuantity
      ).toHaveBeenCalledOnceWith({ ...mockedProduct, quantity: 1 });
      expect(component.totalPrice).toEqual(1);
    });
  });

  describe('#onQuantityChanged', () => {
    it('should only call #onRemoveItem if event is 0', () => {
      jest.spyOn(component, 'onRemoveItem').mockImplementation(() => {});

      component.onQuantityChanged(0);

      expect(component.onRemoveItem).toHaveBeenCalledOnceWith();
      expect(
        cartServiceMock.calculateProductPriceIncludingQuantity
      ).not.toHaveBeenCalled();
    });

    it('should update cartItem quantity if event is > 0', () => {
      component.onQuantityChanged(2);

      expect(component.cartItem.quantity).toEqual(2);
    });

    it('should call CartService #calculateProductPriceIncludingQuantity and #updateCartItem if event is > 0', () => {
      component.onQuantityChanged(3);

      expect(
        cartServiceMock.calculateProductPriceIncludingQuantity
      ).toHaveBeenCalledOnceWith({ ...mockedProduct, quantity: 3 });
      expect(cartServiceMock.updateCartItem).toHaveBeenCalledOnceWith({
        ...mockedProduct,
        quantity: 3,
      });
    });
  });

  describe('#onRemoveItem', () => {
    it('should call CartService #removeCartItem', () => {
      component.onRemoveItem();

      expect(cartServiceMock.removeCartItem).toHaveBeenCalledOnceWith({
        ...mockedProduct,
        quantity: 1,
      } as IProduct);
    });
  });
});
