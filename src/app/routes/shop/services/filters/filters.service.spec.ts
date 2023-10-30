import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { of } from 'rxjs';

describe('FiltersService', () => {
  let service: FiltersService;

  let firestoreServiceMock: any = getFirestoreStub(of(''));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
      ],
    });
    service = TestBed.inject(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
