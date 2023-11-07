import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemsComponent } from './cart-items.component';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';

describe('CartItemsComponent', () => {
  let component: CartItemsComponent;
  let fixture: ComponentFixture<CartItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemsComponent],
    });
    fixture = TestBed.createComponent(CartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#trackByFn', () => {
    it('should return cartItems id', () => {
      expect(component.trackByFn(0, { id: 'test-id' } as ICartItem)).toEqual(
        'test-id'
      );
    });
  });
});
