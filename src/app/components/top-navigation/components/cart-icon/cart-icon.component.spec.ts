import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartIconComponent } from './cart-icon.component';
import { TopNavigationModule } from '../../top-navigation.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart/cart.service';
import { of } from 'rxjs';
import { mockedCartItem } from 'src/app/data/test-data.spec';

describe('CartIconComponent', () => {
  let component: CartIconComponent;
  let fixture: ComponentFixture<CartIconComponent>;

  let cartServiceMock: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    cartServiceMock = jasmine.createSpyObj('CartService', ['getCartItems$']);

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
      cartServiceMock.getCartItems$.and.returnValue(of([mockedCartItem]));
      component.ngOnInit();

      expect(cartServiceMock.getCartItems$).toHaveBeenCalledOnceWith();
      expect(component.itemsInCart).toEqual([mockedCartItem]);
    });
  });

  describe('#onCartSelected', () => {
    it('should showDraw and stop event propagation', () => {
      const event = { stopPropagation: jasmine.createSpy() };

      component.onCartSelected(event as unknown as MouseEvent);

      expect(component.showDraw).toBeTrue();
      expect(event.stopPropagation).toHaveBeenCalledOnceWith();
    });
  });

  describe('#onCloseDraw', () => {
    it('should set showDraw to false', () => {
      component.showDraw = true;
      component.onCloseDraw();

      expect(component.showDraw).toBeFalse();
    });
  });
});
