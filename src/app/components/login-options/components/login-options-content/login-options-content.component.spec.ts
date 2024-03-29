import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOptionsContentComponent } from './login-options-content.component';
import { LoginService } from 'src/app/services/login/login.service';
import { GoogleSignInService } from 'src/app/services/auth/google/google-sign-in.service';
import { mockedUser } from 'src/app/data/test-data.spec';
import { of } from 'rxjs';
import { User } from 'firebase/auth';
import { FacebookSignInService } from 'src/app/services/auth/facebook/facebook-sign-in.service';

describe('LoginOptionsContentComponent', () => {
  let component: LoginOptionsContentComponent;
  let fixture: ComponentFixture<LoginOptionsContentComponent>;

  let loginServiceMock: jasmine.SpyObj<LoginService>;
  let googleSigninServiceMock: jasmine.SpyObj<GoogleSignInService>;
  let facebookSigninServiceMock: jasmine.SpyObj<FacebookSignInService>;

  beforeEach(() => {
    loginServiceMock = {
      'loginSuccess': jest.fn()
    };
    googleSigninServiceMock = {
      'signInWithPopup': jest.fn()
    };
    facebookSigninServiceMock = {
      'signInWithPopup': jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [LoginOptionsContentComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: GoogleSignInService, useValue: googleSigninServiceMock },
        { provide: FacebookSignInService, useValue: facebookSigninServiceMock },
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
      googleSigninServiceMock.signInWithPopup.mockReturnValue(
        of(mockedUser as unknown as User)
      );
      component.loginWithGoogle();

      expect(googleSigninServiceMock.signInWithPopup).toHaveBeenCalled();
      expect(loginServiceMock.loginSuccess).toHaveBeenCalledOnceWith(
        mockedUser as unknown as User
      );
    });
  });

  describe('#loginWithFacebook', () => {
    it('should call loginService with user obtained from facebookLoginService', () => {
      facebookSigninServiceMock.signInWithPopup.mockReturnValue(
        of(mockedUser as unknown as User)
      );
      component.loginWithFacebook();

      expect(facebookSigninServiceMock.signInWithPopup).toHaveBeenCalled();
      expect(loginServiceMock.loginSuccess).toHaveBeenCalledOnceWith(
        mockedUser as unknown as User
      );
    });
  });
});
