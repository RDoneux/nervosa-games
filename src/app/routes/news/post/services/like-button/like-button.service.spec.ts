import { TestBed } from '@angular/core/testing';

import { LikeButtonService } from './like-button.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { PostService } from '../post/post.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

describe('LikeButtonService', () => {
  let service: LikeButtonService;
  let postServiceMock = { getPost: (postId: string) => {} };
  let localStorageServiceMock: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageServiceMock = jasmine.createSpyObj('LocalStorageService', [
      'get',
      'save',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: PostService, useValue: postServiceMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock },
      ],
    });
    service = TestBed.inject(LikeButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getLikedNumber', () => {
    it('should call PostService #getPost with post id', () => {
      spyOn(postServiceMock, 'getPost');
      service.getLikedNumber('test-post-id');

      expect(postServiceMock.getPost).toHaveBeenCalledOnceWith('test-post-id');
    });
  });

  describe('#storeLikedPost', () => {
    it('should do nothing if likedPosts does includes postId', () => {
      localStorageServiceMock.get.and.returnValue('["test-post-id"]');
      service.storeLikedPost('test-post-id');
      expect(localStorageServiceMock.save).not.toHaveBeenCalled();
    });
    it('should save likedPosts to local storage if not already saved', () => {
      service.storeLikedPost('test-post-id');
      expect(localStorageServiceMock.save).toHaveBeenCalledOnceWith(
        'LP',
        '["test-post-id"]'
      );
    });
  });

  describe('#removeLikedPost', () => {
    it('should do nothing if likedPosts does not include postId', () => {
      service.removeLikedPost('test-post-id');
      expect(localStorageServiceMock.save).not.toHaveBeenCalled();
    });
    it('should remove likedPosts from local storage if previously saved', () => {
      localStorageServiceMock.get.and.returnValue('["test-post-id"]');
      service.removeLikedPost('test-post-id');
      expect(localStorageServiceMock.save).toHaveBeenCalledOnceWith('LP', '[]');
    });
  });

  describe('#postIsLiked', () => {
    it('should return true if postId is saved in local storage', () => {
      localStorageServiceMock.get.and.returnValue('["test-post-id"]');
      expect(service.postIsLiked('test-post-id')).toBeTrue();
    });
    it('should return false if postId is not saved in local storage', () => {
      expect(service.postIsLiked('test-post-id')).toBeFalse();
    });
  });
});
