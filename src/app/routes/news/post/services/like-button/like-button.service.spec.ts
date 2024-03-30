import { TestBed } from '@angular/core/testing';

import { LikeButtonService } from './like-button.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { PostService } from '../post/post.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

describe('LikeButtonService', () => {
  let service: LikeButtonService;
  let postServiceMock = { getPost: (postId: string) => {} };
  let localStorageServiceMock: {get: jest.Mock, save: jest.Mock}

  beforeEach(() => {
    localStorageServiceMock = {
      'get': jest.fn(),
      'save': jest.fn()
    };
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
      jest.spyOn(postServiceMock, 'getPost').mockImplementation(() => {});
      service.getLikedNumber('test-post-id');

      expect(postServiceMock.getPost).toHaveBeenCalledWith('test-post-id');
    });
  });

  describe('#storeLikedPost', () => {
    it('should do nothing if likedPosts does includes postId', () => {
      localStorageServiceMock.get.mockReturnValue('["test-post-id"]');
      service.storeLikedPost('test-post-id');
      expect(localStorageServiceMock.save).not.toHaveBeenCalled();
    });
    it('should save likedPosts to local storage if not already saved', () => {
      service.storeLikedPost('test-post-id');
      expect(localStorageServiceMock.save).toHaveBeenCalledWith(
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
      localStorageServiceMock.get.mockReturnValue('["test-post-id"]');
      service.removeLikedPost('test-post-id');
      expect(localStorageServiceMock.save).toHaveBeenCalledWith('LP', '[]');
    });
  });

  describe('#postIsLiked', () => {
    it('should return true if postId is saved in local storage', () => {
      localStorageServiceMock.get.mockReturnValue('["test-post-id"]');
      expect(service.postIsLiked('test-post-id')).toBeTruthy();
    });
    it('should return false if postId is not saved in local storage', () => {
      expect(service.postIsLiked('test-post-id')).toBeFalsy();
    });
  });
});
