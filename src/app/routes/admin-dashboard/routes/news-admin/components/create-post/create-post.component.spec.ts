import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { LoginService } from 'src/app/services/login/login.service';
import { CreatePostService } from '../../services/create-post.service';
import { NewsAdminModule } from '../../news-admin.module';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import { mockedAnnouncementPost, mockedUser } from 'src/app/data/test-data';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  let loginServiceMock: { getCurrentLoggedInUser: jest.Mock };
  let createPostServiceMock: { uploadPost: jest.Mock };
  let routerServiceMock: { navigateByUrl: jest.Mock };

  beforeEach(() => {
    loginServiceMock = {
      getCurrentLoggedInUser: jest.fn(),
    };
    createPostServiceMock = {
      uploadPost: jest.fn(),
    };
    routerServiceMock = {
      navigateByUrl: jest.fn(),
    };
    TestBed.configureTestingModule({
      imports: [NewsAdminModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: CreatePostService, useValue: createPostServiceMock },
        { provide: StorageService, useValue: getStorageStub('') },
        { provide: Router, useValue: routerServiceMock },
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
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(mockedUser));
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
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(null));

      component.onSubmit();

      expect(component.post.posterId).toEqual('INVALID');
    });

    it('should redirect to the new post', () => {
      component.post = mockedAnnouncementPost;
      component.post.id = 'test-id';

      component.onSubmit();

      expect(routerServiceMock.navigateByUrl).toHaveBeenCalledWith(
        `news/post?${new HttpParams().set('id', 'test-id')}`
      );
    });
  });
});
