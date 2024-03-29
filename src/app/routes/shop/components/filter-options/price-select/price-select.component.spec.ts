import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { PriceSelectComponent } from './price-select.component';
import { ShopModule } from '../../../shop.module';

describe('PriceSelectComponent', () => {
  let component: PriceSelectComponent;
  let fixture: ComponentFixture<PriceSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule],
    });
    fixture = TestBed.createComponent(PriceSelectComponent);
    component = fixture.componentInstance;

    component.priceRange = { min: 1, max: 2 };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call #onModelChange when updateNotifier is called', fakeAsync(() => {
      jest.spyOn(component, 'onModelChange').mockImplementation(() => {});

      component.ngOnInit();

      component.updateNotifier.next(null);

      tick(1000);

      expect(component.onModelChange).toHaveBeenCalledTimes(1);
    }));
    it('should debounce #onModelChange function', () => {
      jest.spyOn(component, 'onModelChange').mockImplementation(() => {});

      component.ngOnInit();
      component.updateNotifier.next(null);

      expect(component.onModelChange).not.toHaveBeenCalled();
    });
  });

  describe('#updateMinValue', () => {
    it('should set min to max if min is greater than max', () => {
      component.priceRange = { min: 3, max: 2 };
      component.updateMinValue();

      expect(component.priceRange.min).toEqual(2);
      expect(component.priceRange.max).toEqual(2);
    });
    it('should not touch min value if it is lower than max value', () => {
      component.priceRange = { min: 2, max: 3 };
      component.updateMinValue();

      expect(component.priceRange.min).toEqual(2);
      expect(component.priceRange.max).toEqual(3);
    });
    it('should emit priceRange value', () => {
      jest.spyOn(component.updateNotifier, 'next').mockImplementation(() => {});

      component.priceRange = { min: 1, max: 2 };
      component.updateMinValue();

      expect(component.updateNotifier.next).toHaveBeenCalledOnceWith(null);
    });
  });

  describe('#udpateMaxValue', () => {
    it('should set max to min if max is less than min', () => {
      component.priceRange = { min: 3, max: 2 };
      component.updateMaxValue();

      expect(component.priceRange.min).toEqual(3);
      expect(component.priceRange.max).toEqual(3);
    });
    it('should not touch max value if it is higher than min value', () => {
      component.priceRange = { min: 2, max: 3 };
      component.updateMaxValue();

      expect(component.priceRange.min).toEqual(2);
      expect(component.priceRange.max).toEqual(3);
    });
    it('should emit priceRange value', () => {
      jest.spyOn(component.updateNotifier, 'next').mockImplementation(() => {});

      component.priceRange = { min: 1, max: 2 };
      component.updateMaxValue();

      expect(component.updateNotifier.next).toHaveBeenCalledOnceWith(null);
    });
  });

  describe('#onModelChange', () => {
    it('should call update #emit with priceRange value', () => {
      jest.spyOn(component.update, 'emit').mockImplementation(() => {});

      component.priceRange = { min: 1, max: 2 };

      component.onModelChange();

      expect(component.update.emit).toHaveBeenCalledOnceWith({
        min: 1,
        max: 2,
      });
    });
  });
});
