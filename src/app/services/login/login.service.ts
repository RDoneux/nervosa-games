import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, take } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user.interface';
import {
  onAuthStateChanged,
  getAuth,
  User,
  Auth,
  signOut,
} from 'firebase/auth';
import { debug } from '../debug/debug';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginRequests: ReplaySubject<'OPEN' | 'CLOSE'> = new ReplaySubject();
  private _loginDetails: ReplaySubject<IUser | null> = new ReplaySubject(1);

  /* istanbul ignore next */
  constructor(private angularFirestore: FirestoreService) {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        this.updateOrCreateNervosaGamesUser(firebaseUser).subscribe({
          next: (user: IUser) => {
            this._loginDetails.next(user);
          },
        });
      } else {
        this._loginDetails.next(null);
      }
    });
  }

  /**
   *
   * @description Checks for an existing instance of matching IUser in DB. If it exists, updates that instance with relevant properties from User; if it doesn't exists, creates a new IUser and saves to DB
   *
   * @param {User} user
   * @returns {Observable<IUser>}
   */
  updateOrCreateNervosaGamesUser(user: User): Observable<IUser> {
    const iUserReplaySubject: ReplaySubject<IUser> = new ReplaySubject();

    this.angularFirestore
      .getFirestore()
      .collection<IUser>('users', (ref) => ref.where('email', '==', user.email))
      .valueChanges()
      .pipe(take(1))
      .subscribe({
        next: (iUser: IUser[] | null) => {
          let nervosaGamesUser: IUser | null = iUser ? iUser[0] : null;
          if (nervosaGamesUser) {
            this.updateExistingNervosaUserFromGoogleUser(
              user,
              nervosaGamesUser
            ).subscribe((res) => {
              this.saveUserToDatabase(res);
              iUserReplaySubject.next(res);
            });
          } else {
            this.generateNervosaUserFromGoogleUser(user).subscribe((res) => {
              this.saveUserToDatabase(res);
              iUserReplaySubject.next(res);
            });
          }
        },
      });

    return iUserReplaySubject;
  }

  /**
   *
   * @description Creates new instance of IUser from a User object returned as an observable
   *
   * @param {User} user
   * @returns {Observable<IUser>}
   */
  generateNervosaUserFromGoogleUser(user: User): Observable<IUser> {
    const iUserSubscription: ReplaySubject<IUser> = new ReplaySubject();
    this.getAdminList().subscribe({
      next: (adminList: { administrators: string[] } | undefined) =>
        iUserSubscription.next({
          displayName: user.displayName ?? 'unknown',
          profilePicture: user.photoURL,
          isAdmin:
            adminList?.administrators.includes(user.email ?? '') ?? false,
          email: user.email ?? 'unknown',
          id: user.uid,
          likedProducts: [],
        }),
    });
    return iUserSubscription;
  }

  /**
   *
   * @description Updates the provided IUser with the User object returned as an observable
   *
   * @param {User} user
   * @param {IUser} iUser
   * @returns {Observable<IUser>}
   */
  updateExistingNervosaUserFromGoogleUser(
    user: User,
    iUser: IUser
  ): Observable<IUser> {
    const iUserSubscription: ReplaySubject<IUser> = new ReplaySubject();
    this.getAdminList().subscribe({
      next: (adminList: { administrators: string[] } | undefined) => {
        iUser.displayName = user.displayName ?? 'unknown';
        iUser.profilePicture = user.photoURL;
        iUser.isAdmin =
          adminList?.administrators.includes(user.email ?? '') ?? false;
        iUser.email = user.email ?? 'unknown';
        iUser.id = user.uid;
        iUserSubscription.next(iUser);
      },
    });
    return iUserSubscription;
  }

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
    return this._loginDetails.pipe(take(1));
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
    this.updateOrCreateNervosaGamesUser(user).subscribe({
      next: (user: IUser) => {
        this._loginDetails.next(user);
      },
    });
  }

  /* istanbul ignore next */
  saveUserToDatabase(user: IUser): void {
    this.angularFirestore
      .getFirestore()
      .collection('users')
      .doc(user.email)
      .update(user);
  }

  /* istanbul ignore next */
  private getAdminList(): Observable<{ administrators: string[] } | undefined> {
    return this.angularFirestore
      .getFirestore()
      .collection<{ administrators: string[] }>('users')
      .doc('administrators')
      .valueChanges();
  }
}
