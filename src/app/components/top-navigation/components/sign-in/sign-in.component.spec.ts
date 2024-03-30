import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login/login.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  let loginServiceMock: {requestUserLogsIn: jest.Mock};

  beforeEach(() => {
    loginServiceMock = {
      'requestUserLogsIn': jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      providers: [
        { provide: LoginService, userValue: loginServiceMock },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
