import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { LoginService } from 'src/app/services/login/login.service';
import { CreatePostService } from '../../services/create-post.service';
import { NewsAdminModule } from '../../news-admin.module';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  let loginServiceMock: jasmine.SpyObj<LoginService>;
  let createPostServiceMock: jasmine.SpyObj<CreatePostService>;

  beforeEach(() => {
    loginServiceMock = jasmine.createSpyObj('LoginService', [
      'getCurrentLoggedInUser',
    ]);
    createPostServiceMock = jasmine.createSpyObj('CreatePostService', [
      'uploadPost',
    ]);
    TestBed.configureTestingModule({
      imports: [NewsAdminModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: CreatePostService, useValue: createPostServiceMock },
        { provide: StorageService, useValue: getStorageStub('')},
      ],
    });
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
