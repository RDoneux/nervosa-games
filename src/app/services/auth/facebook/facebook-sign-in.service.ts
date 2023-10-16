import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, from } from 'rxjs';
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  UserCredential,
  User,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FacebookSignInService {
  constructor() {}

  /* istanbul ignore next */
  signInWithPopup(): Observable<User> {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    const userObservable: ReplaySubject<User> = new ReplaySubject();

    from(signInWithPopup(auth, provider)).subscribe({
      next: (result: UserCredential) => {
        userObservable.next(result.user);
      },
      error: (error: any) => {
        console.log(error)
      },
    });

    return userObservable;
  }
}
