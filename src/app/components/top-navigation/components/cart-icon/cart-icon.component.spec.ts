import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartIconComponent } from './cart-icon.component';
import { TopNavigationModule } from '../../top-navigation.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart/cart.service';
import { of } from 'rxjs';
import { mockedCartItem } from 'src/app/data/test-data';

describe('CartIconComponent', () => {
  let component: CartIconComponent;
  let fixture: ComponentFixture<CartIconComponent>;

  let cartServiceMock: { getCartItems$: jest.Mock };

  beforeEach(() => {
    cartServiceMock = {
      getCartItems$: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [TopNavigationModule, RouterTestingModule],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    });
    fixture = TestBed.createComponent(CartIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should request #getCartItems from CartService', () => {
      cartServiceMock.getCartItems$.mockReturnValue(of([mockedCartItem]));
      component.ngOnInit();

      expect(cartServiceMock.getCartItems$).toHaveBeenCalledWith();
      expect(component.itemsInCart).toEqual([mockedCartItem]);
    });
  });

  describe('#onCartSelected', () => {
    it('should showDraw and stop event propagation', () => {
      const event = { stopPropagation: jest.fn() };

      component.onCartSelected(event as unknown as MouseEvent);

      expect(component.showDraw).toBeTruthy();
      expect(event.stopPropagation).toHaveBeenCalledWith();
    });
  });

  describe('#onCloseDraw', () => {
    it('should set showDraw to false', () => {
      component.showDraw = true;
      component.onCloseDraw();

      expect(component.showDraw).toBeFalsy();
    });
  });
});
