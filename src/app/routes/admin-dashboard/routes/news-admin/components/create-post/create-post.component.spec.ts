import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { LoginService } from 'src/app/services/login/login.service';
import { CreatePostService } from '../../services/create-post.service';
import { NewsAdminModule } from '../../news-admin.module';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import {
  mockedAnnouncementPost,
  mockedUser,
} from 'src/app/data/test-data.spec';
import { of } from 'rxjs';

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
        { provide: StorageService, useValue: getStorageStub('') },
      ],
    });
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#addDownloadUrl', () => {
    it('should set the post backgroundImageUrl variable to given argument', () => {
      component.post.backgroundImageUrl = '';
      component.addDownloadUrl('test-download-url');

      expect(component.post.backgroundImageUrl).toEqual('test-download-url');
    });
  });

  describe('#onSubmit', () => {
    beforeEach(() => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(mockedUser));
    });

    it('should request #getCurrentLoggedInUser from LoginService', () => {
      component.onSubmit();

      expect(loginServiceMock.getCurrentLoggedInUser).toHaveBeenCalledTimes(1);
    });

    it('should set posterId, timestamp', () => {
      component.post = mockedAnnouncementPost;
      component.post.timestamp = undefined;
      component.post.posterId = '';

      component.onSubmit();

      expect(component.post.posterId).toEqual(mockedUser.email);
      expect(component.post.timestamp).toBeDefined();
    });

    it('should set posterId to INVALID if user is not set', () => {
      loginServiceMock.getCurrentLoggedInUser.and.returnValue(of(null));

      component.onSubmit();

      expect(component.post.posterId).toEqual('INVALID');
    });
  });
});
