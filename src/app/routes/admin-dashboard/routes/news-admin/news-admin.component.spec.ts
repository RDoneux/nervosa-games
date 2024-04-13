import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAdminComponent } from './news-admin.component';
import { NewsAdminModule } from './news-admin.module';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import { LoginService } from 'src/app/services/login/login.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('NewsAdminComponent', () => {
  let component: NewsAdminComponent;
  let fixture: ComponentFixture<NewsAdminComponent>;
  let routeMock: { queryParams: Observable<{ id: string }> };

  beforeEach(() => {
    routeMock = {
      queryParams: of({ id: 'test-id' }),
    };

    TestBed.configureTestingModule({
      imports: [NewsAdminModule],
      providers: [
        { provide: FirestoreService, useValue: getFirestoreStub('') },
        { provide: StorageService, useValue: getStorageStub('') },
        { provide: LoginService, useValue: {} },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    });
    fixture = TestBed.createComponent(NewsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
