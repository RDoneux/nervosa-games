import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, from, take } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user.interface';
import {
  onAuthStateChanged,
  getAuth,
  User,
  Auth,
  signOut,
} from 'firebase/auth';
import { UserService } from '../user/user.service';
import { debug } from '../debug/debug';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginRequests: ReplaySubject<'OPEN' | 'CLOSE'> = new ReplaySubject();
  private _currentUser: IUser | null = null;
  private _loginDetails: BehaviorSubject<IUser | null> = new BehaviorSubject(
    this._currentUser
  );

  constructor(private userService: UserService) {}

  /* istanbul ignore next */
  requestUserLogsIn(): Observable<IUser | null> {
    const auth: Auth = getAuth();
    const user: User | null = auth.currentUser;
    if (user) {
      this.submitLoginDetails(user);
    } else {
      this._loginRequests.next('OPEN');
    }
    return this._loginDetails.pipe(take(1));
  }

  /* istanbul ignore next */
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
      onAuthStateChanged(auth, () => {});
    });
    return this._loginDetails;
  }

  /* istanbul ignore next */
  requestLogout(): void {
    const auth: Auth = getAuth();
    signOut(auth)
      .then(() => window.location.reload())
      .catch((error) => {
        debug('error')(error);
      });
  }

  loginRequests(): Observable<'OPEN' | 'CLOSE'> {
    return this._loginRequests;
  }

  loginDetails(): Observable<IUser | null> {
    return this._loginDetails;
  }

  loginSuccess(user: User): void {
    this._loginRequests.next('CLOSE');
    this.submitLoginDetails(user);
  }

  /* istanbul ignore next */
  submitLoginDetails(user: User): void {
    this.userService.generateNervosaUserFromGoogleUser(user).subscribe({
      next: (user: IUser) => {
        this._loginDetails.next(user);
      },
    });
  }
}
