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
  testPost,
} from 'src/app/data/test-data';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IPostMode } from '../../interfaces/i-post-mode';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  let loginServiceMock: { getCurrentLoggedInUser: jest.Mock };
  let createPostServiceMock: { uploadPost: jest.Mock };
  let routerServiceMock: { navigateByUrl: jest.Mock };
  let routeMock: { queryParams: Observable<{ id: string }> };
  let notificationServiceMock: { showNotification: jest.Mock };

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
    routeMock = {
      queryParams: of({ id: 'test-id' }),
    };
    notificationServiceMock = {
      showNotification: jest.fn()
    }

    TestBed.configureTestingModule({
      imports: [NewsAdminModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: CreatePostService, useValue: createPostServiceMock },
        { provide: StorageService, useValue: getStorageStub('') },
        { provide: Router, useValue: routerServiceMock },
        { provide: FirestoreService, useValue: getFirestoreStub('') },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: NotificationService, useValue: notificationServiceMock}
      ],
    });
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call #fetchPost with queryParams', () => {
      jest.spyOn(component, 'fetchPost');
      component.ngOnInit();
      expect(component.fetchPost).toHaveBeenLastCalledWith('test-id');
    });

    it('should set mode to edit', () => {
      component.mode = IPostMode.CREATE;
      component.ngOnInit();
      expect(component.mode).toEqual(IPostMode.EDIT);
    });
  });

  describe('#addDownloadUrl', () => {
    beforeEach(() => {
      component.post = testPost;
    });
    it('should set the post backgroundImageUrl variable to given argument', () => {
      component.post.backgroundImageUrl = '';
      component.addDownloadUrl('test-download-url');

      expect(component.post.backgroundImageUrl).toEqual('test-download-url');
    });
  });

  describe('#removeTitleImage', () => {
    beforeEach(() => {
      component.post = testPost;
    });
    it('should set backgroundImageAlt & backgroundImageUrl to an empty string', () => {
      component.post.backgroundImageAlt = 'test-background-image-alt';
      component.post.backgroundImageUrl = 'test-background-image-url';

      component.removeTitleImage();

      expect(component.post.backgroundImageAlt).toEqual('');
      expect(component.post.backgroundImageUrl).toEqual('');
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

    it('should call #showNotification if current logged in user is not found', () => {
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(null));

      component.onSubmit();

      expect(notificationServiceMock.showNotification).toHaveBeenCalledTimes(1);
    });

    it('should call #uploadPost if current logged in user is valid', () => {
      component.post = mockedAnnouncementPost;
      component.onSubmit();
      expect(createPostServiceMock.uploadPost).toHaveBeenLastCalledWith(mockedAnnouncementPost)
    })

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
