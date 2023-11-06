import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { CheckoutModule } from '../../checkout.module';
import { QuantitySelectorComponent } from 'src/app/components/quantity-selector/quantity-selector.component';
import { mockedProduct } from 'src/app/data/test-data.spec';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutModule, QuantitySelectorComponent],
    });
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.cartItem = { ...mockedProduct, quantity: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
