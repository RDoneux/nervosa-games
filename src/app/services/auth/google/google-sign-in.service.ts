import { Injectable } from '@angular/core';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { from, Observable, ReplaySubject } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GoogleSignInService {
  constructor(private userService: UserService) {}

  signInWithPopup(): Observable<IUser> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const userObservable: ReplaySubject<IUser> = new ReplaySubject();

    from(signInWithPopup(auth, provider)).subscribe({
      next: (result: UserCredential) => {
        console.log(result)
        this.userService.generateNervosaUserFromGoogleUser(result).subscribe({
          next: (result: IUser) => userObservable.next(result),
        });
      },
      error: (error: any) => {},
    });

    return userObservable;
  }
}
