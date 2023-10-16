import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  let storageServiceMock: any;

  beforeEach(() => {
    storageServiceMock = getStorageStub('');
    TestBed.configureTestingModule({
      imports: [FileUploadComponent],
      providers: [{ provide: StorageService, useValue: storageServiceMock }],
    });
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
