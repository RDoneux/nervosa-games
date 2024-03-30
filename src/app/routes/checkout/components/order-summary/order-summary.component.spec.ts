import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryComponent } from './order-summary.component';
import { CartService } from 'src/app/services/cart/cart.service';
import { of } from 'rxjs';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  let cartServiceMock: { getPrice$: jest.Mock };

  beforeEach(() => {
    cartServiceMock = {
      getPrice$: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    });
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should request price from CartService', () => {
      component.delivery = 1;
      cartServiceMock.getPrice$.mockReturnValue(of(5));

      component.ngOnInit();

      expect(cartServiceMock.getPrice$).toHaveBeenCalledWith();
      expect(component.subtotal).toEqual(5);
      expect(component.total).toEqual(6);
    });
  });
});
