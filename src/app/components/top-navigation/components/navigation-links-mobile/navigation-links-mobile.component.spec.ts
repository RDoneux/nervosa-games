import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLinksMobileComponent } from './navigation-links-mobile.component';

describe('NavigationLinksMobileComponent', () => {
  let component: NavigationLinksMobileComponent;
  let fixture: ComponentFixture<NavigationLinksMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavigationLinksMobileComponent]
    });
    fixture = TestBed.createComponent(NavigationLinksMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
