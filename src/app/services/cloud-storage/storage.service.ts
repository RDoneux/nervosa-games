import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private angularFireStorage: AngularFireStorage) {}

  /* istanbul ignore next */
  getStorage(): AngularFireStorage {
    return this.angularFireStorage;
  }
}
