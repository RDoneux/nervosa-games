import { Injectable } from '@angular/core';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  User,
} from 'firebase/auth';
import { from, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSignInService {
  constructor() {}

  signInWithPopup(): Observable<User> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const userObservable: ReplaySubject<User> = new ReplaySubject(1);

    from(signInWithPopup(auth, provider)).subscribe({
      next: (result: UserCredential) => {
        userObservable.next(result.user);
      },
      error: (error: any) => {},
    });

    return userObservable;
  }
}
