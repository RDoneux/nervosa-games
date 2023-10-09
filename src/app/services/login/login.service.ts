import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, take } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { UserService } from '../user/user.service';
import { Unsubscribe } from '@angular/fire/firestore';

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

  ngOnInit(): void {}

  requestUserLogsIn(): Observable<IUser | null> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.submitLoginDetails(user);
    } else {
      this._loginRequests.next('OPEN');
    }
    return this._loginDetails.pipe(take(1));
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
      onAuthStateChanged(auth, () => {});
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
      },
    });
  }
}
