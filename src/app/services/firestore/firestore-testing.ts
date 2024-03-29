import { of } from 'rxjs';

export function getFirestoreStub(returnObject: any) {
  return {
    getFirestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          valueChanges: jest.fn(() => of(returnObject)),
          set: jest.fn(),
          update: jest.fn()
        })),

        valueChanges: jest.fn(() => of(returnObject))
      })),

      doc: jest.fn(() => ({
        valueChanges: jest.fn(() => of(returnObject)),
        update: jest.fn(),
        set: jest.fn()
      }))
    })),
    getAuth: jest.fn(() => ({
      onAuthStateChanged: jest.fn()
    })),
  };
}
