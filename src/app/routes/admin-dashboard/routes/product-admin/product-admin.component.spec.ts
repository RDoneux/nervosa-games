import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminComponent } from './product-admin.component';
import { ProductAdminModule } from './product-admin.module';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';

describe('ProductAdminComponent', () => {
  let component: ProductAdminComponent;
  let fixture: ComponentFixture<ProductAdminComponent>;

  let firestoreServiceMock: any;
  let firestoreStorageMock: any;

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub('');
    firestoreStorageMock = getStorageStub('');
    TestBed.configureTestingModule({
      imports: [ProductAdminModule],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
        { provide: StorageService, useValue: firestoreStorageMock },
      ],
    });
    fixture = TestBed.createComponent(ProductAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
