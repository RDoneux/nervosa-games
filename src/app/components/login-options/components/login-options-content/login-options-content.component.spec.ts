import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOptionsContentComponent } from './login-options-content.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LoginOptionsContentComponent', () => {
  let component: LoginOptionsContentComponent;
  let fixture: ComponentFixture<LoginOptionsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginOptionsContentComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    fixture = TestBed.createComponent(LoginOptionsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
