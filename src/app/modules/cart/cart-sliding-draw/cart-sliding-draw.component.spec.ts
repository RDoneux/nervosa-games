import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSlidingDrawComponent } from './cart-sliding-draw.component';

describe('SlidingDrawComponent', () => {
  let component: CartSlidingDrawComponent;
  let fixture: ComponentFixture<CartSlidingDrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartSlidingDrawComponent],
    });
    fixture = TestBed.createComponent(CartSlidingDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
