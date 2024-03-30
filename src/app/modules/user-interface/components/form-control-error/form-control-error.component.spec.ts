import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlErrorComponent } from './form-control-error.component';
import { from, of } from 'rxjs';
import { NgModel } from '@angular/forms';

describe('FormControlErrorComponent', () => {
  let component: FormControlErrorComponent;
  let fixture: ComponentFixture<FormControlErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlErrorComponent],
    });
    fixture = TestBed.createComponent(FormControlErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngAfterViewInit', () => {
    it('should call #updateError on ngModel value change', () => {
      component.ngModel = { valueChanges: from('i') } as NgModel;
      jest.spyOn(component, 'updateError').mockImplementation(() => {});
      component.ngAfterViewInit();

      expect(component.updateError).toHaveBeenCalledTimes(1);
    });
  });

  describe('#updateError', () => {
    it('should update error if it exists in errorArray and ngModel has error', () => {
      component.ngModel = { hasError: (error: string) => true } as NgModel;
      component.errors = [{ error: 'test-error', message: 'test-message' }];

      component.updateError();

      expect(component.error).toEqual('test-message');
    });

    it('should set error to an empty string if ngModel does not contain error', () => {
      component.ngModel = { hasError: (error: string) => false } as NgModel;
      component.errors = [{ error: 'test-error', message: 'test-message' }];

      component.updateError();

      expect(component.error).toEqual('');
    });
  });
});
