import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { NavigationLinksMobileComponent } from './navigation-links-mobile.component';
import { ElementRef } from '@angular/core';
import { LeftDrawComponent } from 'src/app/components/left-draw/components/left-draw.component';

describe('NavigationLinksMobileComponent', () => {
  let component: NavigationLinksMobileComponent;
  let fixture: ComponentFixture<NavigationLinksMobileComponent>;

  const mockElementRef: any = {
    nativeElement: {
      offsetWidth: 100,
      // contains: (event: MouseEvent) => {},
    },
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NavigationLinksMobileComponent],
      imports: [LeftDrawComponent],
      providers: [{ provide: ElementRef, useValue: mockElementRef }],
    });
    fixture = TestBed.createComponent(NavigationLinksMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#menuClosed', () => {
    it('should set menu to closed state on click outside component', () => {
      component.showMenu = true;
      component.menuClosed(new MouseEvent('click'));
      expect(component.showMenu).toBeFalse();
    });
    it('should do nothing if the click event is inside the component', () => {
      component.showMenu = true;
      jest.spyOn(component, 'getElement').mockReturnValue({
        contains: (event: MouseEvent) => true
      });
      component.menuClosed(new MouseEvent('click'));
      expect(component.getElement).toHaveBeenCalled();
      expect(component.showMenu).toBeTrue();
    });
  });
});
