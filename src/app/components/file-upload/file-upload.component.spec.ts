import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';
import { of } from 'rxjs';
import { UtilsService } from 'src/app/services/utils/utils.service';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  let storageServiceMock: any;
  let utilsServiceMock: jasmine.SpyObj<UtilsService>;

  const referenceStub: any = {
    put: jasmine.createSpy().and.returnValue({
      percentageChanges: jasmine.createSpy(),
      snapshotChanges: jasmine.createSpy().and.returnValue(of([])),
      pause: jasmine.createSpy(),
      resume: jasmine.createSpy(),
      cancel: jasmine.createSpy(),
    }),
    getDownloadURL: jasmine
      .createSpy()
      .and.returnValue(of('mock-download-url')),
  };

  let event: any = {
    target: { files: [{ name: 'test-file-name', size: 1000 }] },
  };

  beforeEach(() => {
    storageServiceMock = getStorageStub('');
    utilsServiceMock = jasmine.createSpyObj('UtilsService', ['formatFileSize']);
    TestBed.configureTestingModule({
      imports: [FileUploadComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceMock },
        { provide: UtilsService, useValue: utilsServiceMock },
      ],
    });
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('componentListeners', () => {
    let event: any;
    beforeEach(() => {
      event = {
        preventDefault: jasmine.createSpy(),
        stopPropagation: jasmine.createSpy(),
        dataTransfer: { files: [] },
      };
    });
    it('#onDragOver: should call #preventDefault and #stopPropagation', () => {
      component.onDragOver(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });
    it('#onDragLeave: should call #preventDefault and #stopPropagation', () => {
      component.onDragLeave(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });
    it('#drop: should call #preventDefault and #stopPropagation', () => {
      spyOn(component, 'onUpload');

      component.onDrop(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });
    it('#drop: should call #onUpload with file target', () => {
      spyOn(component, 'onUpload');

      component.onDrop(event);

      expect(component.onUpload).toHaveBeenCalledTimes(1);
    });
  });

  describe('#onUpload', () => {
    beforeEach(() => {
      event = { target: { files: [{ name: 'test-file-name', size: 1000 }] } };
    });

    it('should return if fileList is empty', () => {
      event = { target: { files: undefined } };

      component.onUpload(event);

      expect(storageServiceMock.getStorage().ref).not.toHaveBeenCalled();
    });

    it('should call storage service #ref', () => {
      storageServiceMock.getStorage().ref.and.returnValue(referenceStub);

      component.onUpload(event);

      expect(storageServiceMock.getStorage().ref).toHaveBeenCalledTimes(1);
    });

    it('should call ref #getDownloadUrl', () => {
      storageServiceMock.getStorage().ref.and.returnValue(referenceStub);

      component.onUpload(event);

      expect(
        storageServiceMock.getStorage().ref().getDownloadURL
      ).toHaveBeenCalled();
    });

    it('should emit download URL', () => {
      storageServiceMock.getStorage().ref.and.returnValue(referenceStub);
      spyOn(component.downloadUrl, 'emit');

      component.onUpload(event);

      expect(component.downloadUrl.emit).toHaveBeenCalledOnceWith(
        'mock-download-url'
      );
    });

    it('should set loadedFileName and loadedFileSize', () => {
      storageServiceMock.getStorage().ref.and.returnValue(referenceStub);
      utilsServiceMock.formatFileSize.and.returnValue('1000KB');

      component.onUpload(event);

      expect(component.loadedFileName).toEqual('test-file-name');
      expect(component.loadedFileSize).toEqual('1000KB');
      expect(utilsServiceMock.formatFileSize).toHaveBeenCalledWith(1000, 0);
    });
  });

  describe('taskControl', () => {
    beforeEach(() => {
      storageServiceMock.getStorage().ref.and.returnValue(referenceStub);
      component.onUpload(event);
    });

    it('#onPause: should set loadingState to PAUSED', () => {
      component.loadingState = 'LOADING';
      component.onPause();

      expect(component.loadingState).toBe('PAUSED');
      expect(referenceStub.put().pause).toHaveBeenCalledTimes(1);
    });

    it('#onResume: should set loadingState to LOADING', () => {
      component.loadingState = 'PAUSED';
      component.onResume();

      expect(component.loadingState).toBe('LOADING');
      expect(referenceStub.put().resume).toHaveBeenCalledTimes(1);
    });

    it('#onCancel: should call task #cancel', () => {
      component.onCancel();

      expect(referenceStub.put().cancel).toHaveBeenCalledTimes(1);
    });

    it('#onDelete: should reset loadedFileName and loadedFileSize', () => {
      component.loadedFileName = 'mock-file-name';
      component.loadedFileSize = 'mock-file-size';

      component.onDelete();

      expect(component.loadedFileName).toEqual('');
      expect(component.loadedFileSize).toEqual('');
    });
  });
});
