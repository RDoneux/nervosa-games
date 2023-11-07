import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { CheckoutModule } from '../../checkout.module';
import { CartService } from 'src/app/services/cart/cart.service';
import { of } from 'rxjs';
import { mockedCartItem } from 'src/app/data/test-data.spec';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  let cartServiceMock: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    cartServiceMock = jasmine.createSpyObj('CartService', [
      'getPrice$',
      'getCartItems$',
    ]);
    TestBed.configureTestingModule({
      imports: [CheckoutModule],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    });
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call CartService #getPrice$ and #getCartItems$', () => {
      cartServiceMock.getPrice$.and.returnValue(of(2));
      cartServiceMock.getCartItems$.and.returnValue(of([mockedCartItem]));

      component.ngOnInit();

      expect(cartServiceMock.getPrice$).toHaveBeenCalledOnceWith();
      expect(cartServiceMock.getCartItems$).toHaveBeenCalledOnceWith();

      expect(component.price).toEqual(2);
      expect(component.cartItems).toEqual([mockedCartItem]);
    });
  });
});
