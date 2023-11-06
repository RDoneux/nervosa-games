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
});
