import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlComponent } from './form-control.component';
import { FormControlErrorComponent } from '../form-control-error/form-control-error.component';
import { ChangeDetectionStrategy } from '@angular/core';

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
    it('should call the validate component method', () => {
      spyOn(component, 'validateComponent');
      component.ngAfterViewInit();
      expect(component.validateComponent).toHaveBeenCalledTimes(1);
    });
  });

  describe('#handleValueChange', () => {
    it('should set hasContent to true if newValue length is greater than zero', () => {
      component.hasContent = false;
      component.handleValueChange('value-with-greater-than-zero');
      expect(component.hasContent).toBeTrue();
    });
    it('should set hasContent to false if newValue length is zero', () => {
      component.hasContent = true;
      component.handleValueChange('');
      expect(component.hasContent).toBeFalse();
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
});
