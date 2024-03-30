
export function getStorageStub(returnObject: any) {
  return {
    getStorage: jest.fn(() => ({
      ref: jest.fn().mockReturnValue(returnObject)
    })),
  };
}
