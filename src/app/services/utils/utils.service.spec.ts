import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#formatFileSize', () => {
    it('should return 0 bytes', () => {
      expect(service.formatFileSize(0, 0)).toEqual('0 Bytes')
    })
    it('should return 999 bytes', () => {
      expect(service.formatFileSize(999, 0)).toEqual('999 Bytes')
    })
    it('should return 1KB bytes', () => {
      expect(service.formatFileSize(1001, 0)).toEqual('1 KB')
    })
    it('should return 1MB bytes', () => {
      expect(service.formatFileSize(1000001, 0)).toEqual('1 MB')
    })
    it('should return 1GB bytes', () => {
      expect(service.formatFileSize(1000000001, 0)).toEqual('1 GB')
    })
    it('should return 1TB bytes', () => {
      expect(service.formatFileSize(1000000000001, 0)).toEqual('1 TB')
    })
  })
});
