import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitySelectorComponent } from './quantity-selector.component';

describe('QuantitySelectorComponent', () => {
  let component: QuantitySelectorComponent;
  let fixture: ComponentFixture<QuantitySelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuantitySelectorComponent],
    });
    fixture = TestBed.createComponent(QuantitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onAdd', () => {
    it('should increment current value and emit new value', () => {
      jest.spyOn(component.valueChanged, 'emit').mockImplementation(() => {});
      component.value = 1;

      component.onAdd();

      expect(component.valueChanged.emit).toHaveBeenCalledWith(2);
    });
  });

  describe('#onRemove', () => {
    it('should do nothing if current value is 0', () => {
      jest.spyOn(component.valueChanged, 'emit').mockImplementation(() => {});
      component.value = 0;

      component.onRemove();

      expect(component.valueChanged.emit).not.toHaveBeenCalled();
    });
    it('should decrement value and emit new value if current value is greater than 0', () => {
      jest.spyOn(component.valueChanged, 'emit').mockImplementation(() => {});
      component.value = 3;

      component.onRemove();

      expect(component.valueChanged.emit).toHaveBeenCalledWith(2);
    });
  });
});
