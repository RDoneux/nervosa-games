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
import { NotificationType } from 'src/app/modules/notification/interfaces/i-notification';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  let loginServiceMock: { getCurrentLoggedInUser: jest.Mock };
  let createPostServiceMock: { uploadPost: jest.Mock; deletePost: jest.Mock };
  let routerServiceMock: { navigateByUrl: jest.Mock };
  let routeMock: { queryParams: Observable<{ id: string }> };
  let notificationServiceMock: {
    showNotification: jest.Mock;
    askBinaryQuestion: jest.Mock;
  };

  beforeEach(() => {
    loginServiceMock = {
      getCurrentLoggedInUser: jest.fn(),
    };
    createPostServiceMock = {
      uploadPost: jest.fn(),
      deletePost: jest.fn(),
    };
    routerServiceMock = {
      navigateByUrl: jest.fn(),
    };
    routeMock = {
      queryParams: of({ id: 'test-id' }),
    };
    notificationServiceMock = {
      showNotification: jest.fn(),
      askBinaryQuestion: jest.fn().mockReturnValue(of(true)),
    };

    TestBed.configureTestingModule({
      imports: [NewsAdminModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: CreatePostService, useValue: createPostServiceMock },
        { provide: StorageService, useValue: getStorageStub('') },
        { provide: Router, useValue: routerServiceMock },
        { provide: FirestoreService, useValue: getFirestoreStub('') },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: NotificationService, useValue: notificationServiceMock },
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
      expect(createPostServiceMock.uploadPost).toHaveBeenLastCalledWith(
        mockedAnnouncementPost
      );
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

  describe('#areYouSure', () => {
    beforeEach(() => {
      component.post = mockedAnnouncementPost;
    });
    it('should request #askBinaryQuestion from notification service', () => {
      component.areYouSure();
      expect(
        notificationServiceMock.askBinaryQuestion
      ).toHaveBeenLastCalledWith('Delete Post?');
    });

    it('should request createPostService #deletePost with correct id if response it true', () => {
      component.post.id = 'test-id';
      component.areYouSure();
      expect(createPostServiceMock.deletePost).toHaveBeenLastCalledWith(
        'test-id'
      );
    });

    it('should request notificationService #showNotification if response is true', () => {
      component.areYouSure();
      expect(notificationServiceMock.showNotification).toHaveBeenLastCalledWith(
        'Post successfully deleted',
        NotificationType.SUCCESS,
        3000
      );
    });

    it('should redirect to "news" if response is true', () => {
      component.areYouSure();
      expect(routerServiceMock.navigateByUrl).toHaveBeenLastCalledWith('news');
    })

    it('should do nothing if response is false', () => {
      notificationServiceMock.askBinaryQuestion.mockReturnValue(of(false))
      expect(createPostServiceMock.deletePost).not.toHaveBeenCalled();
      expect(notificationServiceMock.showNotification).not.toHaveBeenCalled();
      expect(routerServiceMock.navigateByUrl).not.toHaveBeenCalled();      
    })
  });
});
