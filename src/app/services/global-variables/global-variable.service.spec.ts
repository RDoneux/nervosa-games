import { TestBed } from '@angular/core/testing';

import { GlobalVariableService } from './global-variable.service';
import { getFirestoreStub } from '../firestore/firestore-testing';
import { FirestoreService } from '../firestore/firestore.service';

describe('GlobalVariableService', () => {
  let service: GlobalVariableService;

  let angularFirestoreMock: any;

  beforeEach(() => {
    angularFirestoreMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: angularFirestoreMock },
      ],
    });
    service = TestBed.inject(GlobalVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
