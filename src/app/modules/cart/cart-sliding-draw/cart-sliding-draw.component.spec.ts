import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSlidingDrawComponent } from './cart-sliding-draw.component';
import { CartModule } from '../cart.module';
import { QuantitySelectorComponent } from 'src/app/components/quantity-selector/quantity-selector.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SlidingDrawComponent', () => {
  let component: CartSlidingDrawComponent;
  let fixture: ComponentFixture<CartSlidingDrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartModule, QuantitySelectorComponent, RouterTestingModule]
    });
    fixture = TestBed.createComponent(CartSlidingDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
