import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private angularFirestore: AngularFirestore) {}

  /* istanbul ignore next */
  getFirestore(): AngularFirestore {
    return this.angularFirestore;
  }
}
