import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponentComponent } from './create-component.component';
import { ProductAdminModule } from '../../product-admin.module';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';

describe('CreateComponentComponent', () => {
  let component: CreateComponentComponent;
  let fixture: ComponentFixture<CreateComponentComponent>;

  let firestoreServiceMock: any;
  let firestoreStorageMock: any;

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub('');
    firestoreStorageMock = getStorageStub('');
    TestBed.configureTestingModule({
      imports: [ProductAdminModule],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
        { provide: StorageService, useValue: firestoreServiceMock },
      ],
    });
    fixture = TestBed.createComponent(CreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
