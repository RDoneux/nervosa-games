import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSlidingDrawComponent } from './cart-sliding-draw.component';
import { CartModule } from '../cart.module';
import { QuantitySelectorComponent } from 'src/app/components/quantity-selector/quantity-selector.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart/cart.service';
import { mockedCartItem } from 'src/app/data/test-data';
import { of } from 'rxjs';

describe('SlidingDrawComponent', () => {
  let component: CartSlidingDrawComponent;
  let fixture: ComponentFixture<CartSlidingDrawComponent>;

  let cartServiceMock: {
    getCartItems$: jest.Mock;
    getPrice$: jest.Mock;
    removeCartItem: jest.Mock;
    updateCartItem: jest.Mock;
  };

  beforeEach(() => {
    cartServiceMock = {
      getCartItems$: jest.fn(),
      getPrice$: jest.fn(),
      removeCartItem: jest.fn(),
      updateCartItem: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [CartModule, QuantitySelectorComponent, RouterTestingModule],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    });
    fixture = TestBed.createComponent(CartSlidingDrawComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onClick', () => {
    it('should do nothing if draw contains event target', () => {
      jest.spyOn(component, 'draw', 'get').mockReturnValue({
        contains: () => true,
      });
      jest.spyOn(component, 'onClose').mockImplementation(() => {});

      component.onClick({
        target: '',
      } as unknown as MouseEvent);

      expect(component.onClose).not.toHaveBeenCalled();
    });
    it('should call #onClose if draw does not contain event target', () => {
      jest.spyOn(component, 'draw', 'get').mockReturnValue({
        contains: () => false,
      });

      jest.spyOn(component, 'onClose').mockImplementation(() => {});
      component.onClick({ target: '' } as unknown as MouseEvent);

      expect(component.onClose).toHaveBeenCalledWith();
    });
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      cartServiceMock.getCartItems$.mockReturnValue(of([mockedCartItem]));
      cartServiceMock.getPrice$.mockReturnValue(of(1));
    });
    it('should request cart items from CartService', () => {
      component.ngOnInit();

      expect(component.cartItems).toEqual([mockedCartItem]);
    });
    it('should request price from cart service', () => {
      component.ngOnInit();

      expect(component.price).toEqual(1);
    });
  });

  describe('#onRequestProductRemoved', () => {
    it('should call CartService #removeCartItem', () => {
      component.onRequestProductRemoved(mockedCartItem);

      expect(cartServiceMock.removeCartItem).toHaveBeenCalledWith(
        mockedCartItem
      );
    });
  });

  describe('#onProductUpdated', () => {
    it('should call CartService #updateCartItem', () => {
      component.onProductUpdated(mockedCartItem);

      expect(cartServiceMock.updateCartItem).toHaveBeenCalledWith(
        mockedCartItem
      );
    });
  });

  describe('#onClose', () => {
    it('should call requestClose #emit', () => {
      jest.spyOn(component.requestClose, 'emit').mockImplementation(() => {});

      component.onClose();

      expect(component.requestClose.emit).toHaveBeenCalledWith();
    });
  });
});
