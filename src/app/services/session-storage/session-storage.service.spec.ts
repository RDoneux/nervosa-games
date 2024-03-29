import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;
  let sessionStore: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    sessionStore = {};

    jest.spyOn(window.sessionStorage, 'getItem').mockImplementation((key) =>
      key in sessionStore ? sessionStore[key] : null
    );
    jest.spyOn(window.sessionStorage, 'setItem').mockImplementation(
      (key, value) => (sessionStore[key] = value + '')
    );
  });

  it('should have saved session id', () => {
    service = new SessionStorageService();
    expect(sessionStore['NG:session-id']).toBeDefined();
  });

  it('should use existing session id if one exists', () => {
    sessionStore = { 'NG:session-id': 'test-session-id' };
    service = new SessionStorageService();

    service.save('test-key', 'test-value');
    expect(sessionStore[`NG|test-session-id|test-key`]).toBeDefined();
    expect(sessionStore[`NG|test-session-id|test-key`]).toEqual('test-value');
  });

  describe('#save', () => {
    beforeEach(() => {
      service = new SessionStorageService();
    });
    it('should save payload with key prefix', () => {
      const sessionId = sessionStore['NG:session-id'];
      service.save('test-key', 'test-value');
      const savedItem = sessionStore[`NG|${sessionId}|test-key`];
      expect(savedItem).toBeDefined();
      expect(savedItem).toEqual('test-value');
    });
  });

  describe('#get', () => {
    beforeEach(() => {
      service = new SessionStorageService();
    });
    it('should get a saved payload', () => {
      service.save('get-test-key', 'get-test-value');
      const savedItem = service.get('get-test-key');

      expect(savedItem).toBeDefined();
      expect(savedItem).toEqual('get-test-value');
    });
  });
});
