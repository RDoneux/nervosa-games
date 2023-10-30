import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { TextSearchComponent } from './text-search.component';
import { ShopModule } from '../../../shop.module';

describe('TextSearchComponent', () => {
  let component: TextSearchComponent;
  let fixture: ComponentFixture<TextSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule],
    });
    fixture = TestBed.createComponent(TextSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call #onChange after debounce time', fakeAsync(() => {
      spyOn(component, 'onChange');

      component.ngOnInit();

      component.updateNotifier.next('test-value');

      tick(1000);

      expect(component.onChange).toHaveBeenCalledOnceWith('test-value');
    }));

    it('should not call #onChange before debounce time', () => {
      spyOn(component, 'onChange');

      component.ngOnInit();

      component.updateNotifier.next('test-value');

      expect(component.onChange).not.toHaveBeenCalledOnceWith('test-value');
    });
  });

  describe('#onChange', () => {
    it('should call update #emit with lowercase version of input', () => {
      spyOn(component.update, 'emit');

      component.onChange('tEsT-vAlUe');

      expect(component.update.emit).toHaveBeenCalledOnceWith('test-value');
    });
  });
});
