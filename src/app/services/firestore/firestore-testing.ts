import { of } from 'rxjs';

export function getFirestoreStub(returnObject: any) {
  return {
    getFirestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          valueChanges: jest.fn(() => of(returnObject)),
          set: jest.fn(),
          update: jest.fn(),
        }),

        valueChanges: jest.fn(() => of(returnObject)),
      }),

      doc: jest.fn().mockReturnValue({
        valueChanges: jest.fn(() => of(returnObject)),
        update: jest.fn(),
        set: jest.fn(),
      }),
      collectionGroup: jest.fn().mockReturnValue({
        valueChanges: jest.fn(() => of(returnObject))
      })
    }),
    getAuth: jest.fn(() => ({
      onAuthStateChanged: jest.fn(),
    })),

  };
}
