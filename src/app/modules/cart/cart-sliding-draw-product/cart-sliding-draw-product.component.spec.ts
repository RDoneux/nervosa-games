import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSlidingDrawProductComponent } from './cart-sliding-draw-product.component';
import { QuantitySelectorComponent } from 'src/app/components/quantity-selector/quantity-selector.component';
import { CartModule } from '../cart.module';
import { mockedCartItem } from 'src/app/data/test-data.spec';

describe('CartSlidingDrawProductComponent', () => {
  let component: CartSlidingDrawProductComponent;
  let fixture: ComponentFixture<CartSlidingDrawProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuantitySelectorComponent, CartModule],
    });
    fixture = TestBed.createComponent(CartSlidingDrawProductComponent);
    component = fixture.componentInstance;
    component.cartItem = mockedCartItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onQuantityChanged', () => {
    it('should request remove if event is 0', () => {
      spyOn(component.requestRemoved, 'emit');

      component.onQuantityChanged(0);

      expect(component.requestRemoved.emit).toHaveBeenCalledOnceWith();
    });

    it('should not request removed if event is > 0', () => {
      spyOn(component.requestRemoved, 'emit');

      component.onQuantityChanged(1);

      expect(component.requestRemoved.emit).not.toHaveBeenCalled();
    });

    it('should update cartItem quantity with event value', () => {
      component.cartItem = { ...mockedCartItem, quantity: 2 };

      component.onQuantityChanged(3);

      expect(component.cartItem.quantity).toEqual(3);
    });

    it('should emit udpated cart item', () => {
      spyOn(component.updated, 'emit');
      component.cartItem = { ...mockedCartItem, quantity: 2 };

      component.onQuantityChanged(3);

      expect(component.updated.emit).toHaveBeenCalledOnceWith({
        ...mockedCartItem,
        quantity: 3,
      });
    });
  });
});
