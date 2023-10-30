import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  getAuth,
  Auth,
} from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private angularFirestore: AngularFirestore) {}

  /* istanbul ignore next */
  getFirestore(): AngularFirestore {
    return this.angularFirestore;
  }

  getAuth(): Auth {
    return getAuth()
  }
}
