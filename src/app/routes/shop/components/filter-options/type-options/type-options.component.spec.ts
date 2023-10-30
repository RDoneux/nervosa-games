import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOptionsComponent } from './type-options.component';
import { ShopModule } from '../../../shop.module';

describe('TypeOptionsComponent', () => {
  let component: TypeOptionsComponent;
  let fixture: ComponentFixture<TypeOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule],
    });
    fixture = TestBed.createComponent(TypeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onChange', () => {
    it('should remove value from typeArray if it is already in array', () => {
      component.typeArray = ['minature', 'scenery', 'supporting_material'];
      component.onChange('minature');
      expect(component.typeArray.length).toBe(2);
      expect(component.typeArray).toEqual(['scenery', 'supporting_material']);
    });
    it('should add value to array if it is not already in array', () => {
      component.typeArray = ['minature'];
      component.onChange('supporting_material');
      expect(component.typeArray.length).toBe(2);
      expect(component.typeArray).toEqual(['minature', 'supporting_material']);
    });
    it('should emit typeArray', () => {
      spyOn(component.update, 'emit');
      component.typeArray = ['minature'];
      component.onChange('scenery');

      expect(component.update.emit).toHaveBeenCalledOnceWith([
        'minature',
        'scenery',
      ]);
    });
  });
});
