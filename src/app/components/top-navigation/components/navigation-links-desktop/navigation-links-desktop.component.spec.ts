import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLinksDesktopComponent } from './navigation-links-desktop.component';

describe('NavigationLinksDesktopComponent', () => {
  let component: NavigationLinksDesktopComponent;
  let fixture: ComponentFixture<NavigationLinksDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationLinksDesktopComponent]
    });
    fixture = TestBed.createComponent(NavigationLinksDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
