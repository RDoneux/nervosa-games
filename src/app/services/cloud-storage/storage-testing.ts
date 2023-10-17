import { of } from 'rxjs';

export function getStorageStub(returnObject: any) {
  return {
    getStorage: jasmine.createSpy().and.returnValue({
      ref: jasmine.createSpy(),
    }),
  };
}
