import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStore: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});

    const localStorageMock = (function () {
      return {
        getItem: (key: string) => localStore[key],
        setItem: (key: string, value: string) =>
          (localStore[key] = value.toString()),
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

  });

  it('should be created', () => {
    service = new LocalStorageService();
    expect(service).toBeTruthy();
  });

  it('should have saved session id', () => {
    service = new LocalStorageService();
    expect(localStore['NG:session-id']).toBeDefined();
  });

  it('should use existing session id if one exists', () => {
    localStore = { 'NG:session-id': 'test-session-id' };
    service = new LocalStorageService();

    service.save('test-key', 'test-value');
    expect(localStore[`NG|test-session-id|test-key`]).toBeDefined();
    expect(localStore[`NG|test-session-id|test-key`]).toEqual('test-value');
  });

  describe('#save', () => {
    beforeEach(() => {
      service = new LocalStorageService();
    });
    it('should save payload with key prefix', () => {
      const sessionId = localStore['NG:session-id'];
      service.save('test-key', 'test-value');
      const savedItem = localStore[`NG|${sessionId}|test-key`];
      expect(savedItem).toBeDefined();
      expect(savedItem).toEqual('test-value');
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      service = new LocalStorageService();
    });
    it('should get a saved payload', () => {
      service.save('get-test-key', 'get-test-value');
      const savedItem = service.get('get-test-key');

      expect(savedItem).toBeDefined();
      expect(savedItem).toEqual('get-test-value');
    });
  });
});
