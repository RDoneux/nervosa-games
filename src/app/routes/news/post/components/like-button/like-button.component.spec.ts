import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeButtonComponent } from './like-button.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { mockedAnnouncementPost } from 'src/app/data/test-data.spec';
import { LikeButtonService } from '../../services/like-button/like-button.service';
import { of } from 'rxjs';

describe('LikeButtonComponent', () => {
  let component: LikeButtonComponent;
  let fixture: ComponentFixture<LikeButtonComponent>;
  // let onLikeSpy: jasmine.Spy;
  let likeButtonServiceSpy: jasmine.SpyObj<LikeButtonService>;

  beforeEach(() => {
    likeButtonServiceSpy = jasmine.createSpyObj('LikeButtonService', [
      'updateLikedNumber',
      'postIsLiked',
      'getLikedNumber',
      'storeLikedPost',
      'removeLikedPost',
    ]);
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
    likeButtonServiceSpy.getLikedNumber.and.returnValue(
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
      likeButtonServiceSpy.postIsLiked.and.returnValue(true);
      component.ngOnInit();

      expect(likeButtonServiceSpy.postIsLiked).toHaveBeenCalled();
      expect(component.liked).toBeTrue();
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
      expect(component.liked).toBeTrue();
    });
    it('should call LikeButtonService #updateLikedNumber', () => {
      component.likedBy = 0;
      component.onLike();
      expect(likeButtonServiceSpy.updateLikedNumber).toHaveBeenCalledOnceWith(
        component.postId,
        1
      );
    });
    it('should call LikeButtonService #storeLikedPost if liked is true', () => {
      component.liked = false;
      component.onLike();
      expect(likeButtonServiceSpy.storeLikedPost).toHaveBeenCalledOnceWith(
        component.postId
      );
      expect(likeButtonServiceSpy.removeLikedPost).not.toHaveBeenCalled();
    });
    it('should call LikeButtonService #removeLikedPost if liked is false', () => {
      component.liked = true;
      component.onLike();
      expect(likeButtonServiceSpy.removeLikedPost).toHaveBeenCalledOnceWith(
        component.postId
      );
      expect(likeButtonServiceSpy.storeLikedPost).not.toHaveBeenCalled();
    });
  });
});
