import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonComponent } from './like-button.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { mockedAnnouncementPost } from 'src/app/data/test-data';
import { LikeButtonService } from '../../services/like-button/like-button.service';
import { of } from 'rxjs';

describe('LikeButtonComponent', () => {
  let component: LikeButtonComponent;
  let fixture: ComponentFixture<LikeButtonComponent>;
  let likeButtonServiceSpy: {
    updateLikedNumber: jest.Mock;
    postIsLiked: jest.Mock;
    getLikedNumber: jest.Mock;
    storeLikedPost: jest.Mock;
    removeLikedPost: jest.Mock;
  };

  beforeEach(() => {
    likeButtonServiceSpy = {
      updateLikedNumber: jest.fn(),
      postIsLiked: jest.fn(),
      getLikedNumber: jest.fn(),
      storeLikedPost: jest.fn(),
      removeLikedPost: jest.fn(),
    };
    TestBed.configureTestingModule({
      declarations: [LikeButtonComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: '' },
        { provide: LikeButtonService, useValue: likeButtonServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(LikeButtonComponent);
    component = fixture.componentInstance;
    component.postId = 'test-post-id';
    likeButtonServiceSpy.getLikedNumber.mockReturnValue(
      of([mockedAnnouncementPost])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call LikeButtonService #postIsLiked', () => {
      component.liked = false;
      likeButtonServiceSpy.postIsLiked.mockReturnValue(true);
      component.ngOnInit();

      expect(likeButtonServiceSpy.postIsLiked).toHaveBeenCalled();
      expect(component.liked).toBeTruthy();
    });
  });

  describe('#setSeenBy', () => {
    it('should update likedBy from provided AnnouncementPost', () => {
      component.setLikedBy(mockedAnnouncementPost);
      expect(component.likedBy).toBe(2);
    });
  });

  describe('#onLike', () => {
    it('should toggle liked variable', () => {
      component.liked = false;
      component.onLike();
      expect(component.liked).toBeTruthy();
    });
    it('should call LikeButtonService #updateLikedNumber', () => {
      component.likedBy = 0;
      component.onLike();
      expect(likeButtonServiceSpy.updateLikedNumber).toHaveBeenCalledWith(
        component.postId,
        1
      );
    });
    it('should call LikeButtonService #storeLikedPost if liked is true', () => {
      component.liked = false;
      component.onLike();
      expect(likeButtonServiceSpy.storeLikedPost).toHaveBeenCalledWith(
        component.postId
      );
      expect(likeButtonServiceSpy.removeLikedPost).not.toHaveBeenCalled();
    });
    it('should call LikeButtonService #removeLikedPost if liked is false', () => {
      component.liked = true;
      component.onLike();
      expect(likeButtonServiceSpy.removeLikedPost).toHaveBeenCalledWith(
        component.postId
      );
      expect(likeButtonServiceSpy.storeLikedPost).not.toHaveBeenCalled();
    });
  });
});
