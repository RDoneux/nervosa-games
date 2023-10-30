import { of } from 'rxjs';

export function getFirestoreStub(returnObject: any) {
  return {
    getFirestore: jasmine.createSpy().and.returnValue({
      collection: jasmine.createSpy().and.returnValue({
        doc: jasmine.createSpy().and.returnValue({
          valueChanges: jasmine.createSpy().and.returnValue(of(returnObject)),
          set: jasmine.createSpy(),
          update: jasmine.createSpy(),
        }),
        valueChanges: jasmine.createSpy().and.returnValue(of(returnObject)),
      }),
      doc: jasmine.createSpy().and.returnValue({
        valueChanges: jasmine.createSpy().and.returnValue(of(returnObject)),
        update: jasmine.createSpy(),
        set: jasmine.createSpy(),
      }),
    }),
    getAuth: jasmine
      .createSpy()
      .and.returnValue({ onAuthStateChanged: jasmine.createSpy() }),
  };
}
