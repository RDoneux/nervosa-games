import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLinksMobileComponent } from './navigation-links-mobile.component';
import { LeftDrawComponent } from 'src/app/components/left-draw/left-draw.component';

describe('NavigationLinksMobileComponent', () => {
  let component: NavigationLinksMobileComponent;
  let fixture: ComponentFixture<NavigationLinksMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationLinksMobileComponent],
      imports: [LeftDrawComponent]
    });
    fixture = TestBed.createComponent(NavigationLinksMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
