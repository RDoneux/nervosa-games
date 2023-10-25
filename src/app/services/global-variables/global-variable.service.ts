import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGlobalVariables } from 'src/app/interfaces/i-global-variables.interface';
import { FirestoreService } from '../firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalVariableService {
  constructor(private firestoreService: FirestoreService) {}

  getGlobalVariables(): Observable<IGlobalVariables | undefined> {
    return this.firestoreService
      .getFirestore()
      .doc<IGlobalVariables>('siteData/globalVariables')
      .valueChanges();
  }
}
