import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOptionsComponent } from './login-options.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { LoginService } from 'src/app/services/login/login.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginOptionsComponent', () => {
  let component: LoginOptionsComponent;
  let fixture: ComponentFixture<LoginOptionsComponent>;

  let loginServiceMock: {loginRequests: jest.Mock}

  beforeEach(() => {
    loginServiceMock = {
      'loginRequests': jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [LoginOptionsComponent],
      imports: [ModalComponent, BrowserAnimationsModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    loginServiceMock.loginRequests.mockReturnValue(of('OPEN'));
    fixture = TestBed.createComponent(LoginOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set show to true if state === OPEN', () => {
      loginServiceMock.loginRequests.mockReturnValue(of('OPEN'));
      component.show = false;
      component.ngOnInit();
      expect(component.show).toBeTruthy();
    });
    it('should set show to false if state === CLOSE', () => {
      loginServiceMock.loginRequests.mockReturnValue(of('CLOSE'));
      component.show = true;
      component.ngOnInit();
      expect(component.show).toBeFalsy();
    });
  });

  describe('#handleClose', () => {
    it('should set show to false', () => {
      component.show = true;
      component.handleClose();
      expect(component.show).toBeFalsy();
    });
  });
});
