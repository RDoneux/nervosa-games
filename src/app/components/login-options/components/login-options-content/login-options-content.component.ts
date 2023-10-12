import { Component } from '@angular/core';
import { GoogleSignInService } from 'src/app/services/auth/google/google-sign-in.service';
import { LoginService } from 'src/app/services/login/login.service';
import { User } from 'firebase/auth';
import { FacebookSignInService } from 'src/app/services/auth/facebook/facebook-sign-in.service';

@Component({
  selector: 'app-login-options-content',
  templateUrl: './login-options-content.component.html',
  styleUrls: ['./login-options-content.component.scss'],
})
export class LoginOptionsContentComponent {
  constructor(
    private loginService: LoginService,
    private googleSigninService: GoogleSignInService,
    private facebookSigninService: FacebookSignInService
  ) {}

  loginWithGoogle(): void {
    this.googleSigninService.signInWithPopup().subscribe({
      next: (user: User) => {
        this.loginService.loginSuccess(user);
      },
    });
  }

  loginWithFacebook(): void {
    this.facebookSigninService.signInWithPopup().subscribe({
      next: (user: User) => {
        console.log("1", user)
        this.loginService.loginSuccess(user);
      },
    });
  }
}
