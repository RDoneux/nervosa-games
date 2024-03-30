import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FormControlComponent } from './form-control.component';
import { FormControlErrorComponent } from '../form-control-error/form-control-error.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { from } from 'rxjs';
import { NgModel } from '@angular/forms';

describe('FormControlComponent', () => {
  let component: FormControlComponent;
  let fixture: ComponentFixture<FormControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlComponent, FormControlErrorComponent],
    })
      .overrideComponent(FormControlComponent, {
        set: { changeDetection: ChangeDetectionStrategy.OnPush },
      })
      .compileComponents();
    fixture = TestBed.createComponent(FormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#afterViewInit', () => {
    it('should call the validate component method', fakeAsync(() => {
      jest.spyOn(component, 'validateComponent').mockImplementation(() => {});
      component.ngAfterViewInit();
      tick();
      expect(component.validateComponent).toHaveBeenCalledTimes(1);
    }));
    it('should call #determinLayout', fakeAsync(() => {
      jest.spyOn(component, 'determineLayout').mockImplementation(() => {});
      component.ngAfterViewInit();
      tick();
      expect(component.determineLayout).toHaveBeenCalledTimes(1);
    }));
    it('should call #handleViewChange when ngModel value changes', () => {
      jest.spyOn(component, 'handleValueChange').mockImplementation(() => {});
      component.ngModel = { valueChanges: from('new value') } as NgModel;

      component.ngAfterViewInit();

      expect(component.handleValueChange).toHaveBeenCalled();
    });
  });

  describe('#handleValueChange', () => {
    it('should set hasContent to true if newValue length is greater than zero', () => {
      component.hasContent = false;
      component.handleValueChange('value-with-greater-than-zero');
      expect(component.hasContent).toBeTruthy();
    });
    it('should set hasContent to false if newValue length is zero', () => {
      component.hasContent = true;
      component.handleValueChange('');
      expect(component.hasContent).toBeFalsy();
    });
  });

  describe('#validateComponent', () => {
    var input: HTMLInputElement;
    beforeEach(() => {
      input = document.createElement('input');
    });
    it('should set id from input element if one is defined', () => {
      input.id = 'test-id';
      component.inputElement = input;
      component.validateComponent();

      expect(component.id).toEqual('test-id');
    });

    it('should set input element id to random uuid', () => {
      component.inputElement = input;
      component.validateComponent();

      const expectedUUID: string = component.id;

      expect(component.inputElement.id).toEqual(expectedUUID);
    });
  });

  describe('#determinLayout', () => {
    it('should use default layout if input is not of type checkbox, radio or textarea', () => {
      component.inputElement = {
        type: 'text',
        nodeName: 'input',
      } as HTMLInputElement;
      component.determineLayout();

      expect(component.layout).toEqual('DEFAULT');
    });
    it('should use INLINE layout if input is of type checkbox or radio', () => {
      component.inputElement = {
        type: 'checkbox',
        nodeName: 'input',
      } as HTMLInputElement;
      component.determineLayout();

      expect(component.layout).toEqual('INLINE');
    });
    it('should use STATIC layout if input is of type TextArea', () => {
      component.inputElement = { nodeName: 'TEXTAREA' } as HTMLTextAreaElement;
      component.determineLayout();

      expect(component.layout).toEqual('STATIC');
    });
  });
});
