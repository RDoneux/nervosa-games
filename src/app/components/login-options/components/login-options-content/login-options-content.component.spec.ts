import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOptionsContentComponent } from './login-options-content.component';

describe('LoginOptionsContentComponent', () => {
  let component: LoginOptionsContentComponent;
  let fixture: ComponentFixture<LoginOptionsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginOptionsContentComponent]
    });
    fixture = TestBed.createComponent(LoginOptionsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
