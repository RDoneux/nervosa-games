import { of } from 'rxjs';

export function getStorageStub(returnObject: any) {
  return {
    getStorage: jest.fn(() => ({
      ref: jest.fn()
    })),
  };
}
