import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOptionsContentComponent } from './login-options-content.component';
import { LoginService } from 'src/app/services/login/login.service';
import { GoogleSignInService } from 'src/app/services/auth/google/google-sign-in.service';
import { mockedUser } from 'src/app/data/test-data.spec';
import { of } from 'rxjs';
import { User } from 'firebase/auth';

describe('LoginOptionsContentComponent', () => {
  let component: LoginOptionsContentComponent;
  let fixture: ComponentFixture<LoginOptionsContentComponent>;

  let loginServiceMock: jasmine.SpyObj<LoginService>;
  let googleSigninServiceMock: jasmine.SpyObj<GoogleSignInService>;

  beforeEach(() => {
    loginServiceMock = jasmine.createSpyObj('LoginService', ['loginSuccess']);
    googleSigninServiceMock = jasmine.createSpyObj('GoogleSigninService', [
      'signInWithPopup',
    ]);
    TestBed.configureTestingModule({
      declarations: [LoginOptionsContentComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: GoogleSignInService, useValue: googleSigninServiceMock },
      ],
    });
    fixture = TestBed.createComponent(LoginOptionsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#loginWithGoogle', () => {
    it('should call loginService with user obtained from googleSigninService', () => {
      googleSigninServiceMock.signInWithPopup.and.returnValue(
        of(mockedUser as unknown as User)
      );
      component.loginWithGoogle();

      expect(googleSigninServiceMock.signInWithPopup).toHaveBeenCalled();
      expect(loginServiceMock.loginSuccess).toHaveBeenCalledOnceWith(
        mockedUser as unknown as User
      );
    });
  });
});
