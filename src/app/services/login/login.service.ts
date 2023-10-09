import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginRequests: ReplaySubject<'OPEN' | 'CLOSE'> = new ReplaySubject(
    1
  );
  private _loginDetails: ReplaySubject<IUser | null> = new ReplaySubject(1);

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  requestUserLogsIn(): Observable<IUser | null> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.submitLoginDetails(user);
    } else {
      this._loginRequests.next('OPEN');
    }
    return this._loginDetails;
  }

  getCurrentLoggedInUser(): Observable<IUser | null> {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        this.userService
          .generateNervosaUserFromGoogleUser(firebaseUser)
          .subscribe({
            next: (user: IUser) => this._loginDetails.next(user),
          });
      } else {
        this._loginDetails.next(null);
      }
    });
    return this._loginDetails;
  }

  loginRequests(): Observable<'OPEN' | 'CLOSE'> {
    return this._loginRequests;
  }

  loginSuccess(user: User): void {
    this._loginRequests.next('CLOSE');
    this.submitLoginDetails(user);
  }

  private submitLoginDetails(user: User): void {
    this.userService.generateNervosaUserFromGoogleUser(user).subscribe({
      next: (user: IUser) => {
        this._loginDetails.next(user);
        this._loginDetails = new ReplaySubject(1);
      },
    });
  }
}
