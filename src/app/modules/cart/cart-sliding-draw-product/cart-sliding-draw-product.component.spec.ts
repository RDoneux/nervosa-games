import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSlidingDrawProductComponent } from './cart-sliding-draw-product.component';

describe('CartSlidingDrawProductComponent', () => {
  let component: CartSlidingDrawProductComponent;
  let fixture: ComponentFixture<CartSlidingDrawProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartSlidingDrawProductComponent]
    });
    fixture = TestBed.createComponent(CartSlidingDrawProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
