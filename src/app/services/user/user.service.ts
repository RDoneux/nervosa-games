import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { UserCredential, User } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private angularFirestore: AngularFirestore) {}

  saveUserToDatabase(user: IUser): void {
    this.angularFirestore.collection('users').doc(user.email).set(user);
  }

  generateNervosaUserFromGoogleUser(
    userCredential: UserCredential
  ): Observable<IUser> {
    const user: User = userCredential.user;
    const iUserReplaySubject: ReplaySubject<IUser> = new ReplaySubject();

    this.getAdminList().subscribe({
      next: (adminList: { administrators: string[] } | undefined) => {
        const nervosaGamesUser: IUser = {
          displayName: user.displayName ?? 'unknown',
          isAdmin:
            adminList?.administrators.includes(user.email ?? '') ?? false,
          email: user.email ?? 'unknown',
          id: user.uid,
        };
        this.saveUserToDatabase(nervosaGamesUser);
        iUserReplaySubject.next(nervosaGamesUser);
      },
    });
    return iUserReplaySubject;
  }

  private getAdminList(): Observable<{ administrators: string[] } | undefined> {
    return this.angularFirestore
      .collection<{ administrators: string[] }>('users')
      .doc('administrators')
      .valueChanges();
  }
}
