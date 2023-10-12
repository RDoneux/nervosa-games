import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentSectionComponent } from './comment-section.component';
import {
  mockedAnnouncementPost,
  mockedComment,
  mockedUser,
} from 'src/app/data/test-data.spec';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IComment } from 'src/app/interfaces/i-comment.interface';
import { Timestamp } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('CommentSectionComponent', () => {
  let component: CommentSectionComponent;
  let fixture: ComponentFixture<CommentSectionComponent>;

  let firestoreServiceMock: any;

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub([mockedAnnouncementPost]);
    TestBed.configureTestingModule({
      imports: [
        CommentSectionComponent,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
      ],
    });
    fixture = TestBed.createComponent(CommentSectionComponent);
    component = fixture.componentInstance;

    component.user = mockedUser;
    component.postId = 'test-post-id';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should update newComment with user information', () => {
      component.ngOnInit();

      expect(component.newComment.comment).toEqual('');
      expect(component.newComment.likedBy).toBe(0);
      expect(component.newComment.userDisplayName).toEqual(
        mockedUser.displayName
      );
      expect(component.newComment.userImageUrl).toEqual(
        mockedUser.profilePicture ?? ''
      );
      expect(component.newComment.datePosted).toBeDefined();
    });

    it('should request comments from firestore service', () => {
      component.ngOnInit();

      expect(
        firestoreServiceMock.getFirestore().collection
      ).toHaveBeenCalledWith('posts', jasmine.any(Function));
    });

    it('should request recieved data is sorted', () => {
      spyOn(component, 'sortData');

      component.ngOnInit();

      expect(component.sortData).toHaveBeenCalledOnceWith([mockedComment]);
    });

    it('should set existingComments to recieved data', () => {
      component.ngOnInit();
      expect(component.existingComments).toEqual([mockedComment]);
    });
  });

  describe('#sortData', () => {
    it('should sort comments by date', () => {
      const unsortedData: IComment[] = [
        {
          userDisplayName: 'last',
          userImageUrl: 'test-user-image-url',
          datePosted: Timestamp.fromMillis(new Date().getTime() - 1000),
          comment: 'test-comment',
          likedBy: 1,
        },
        {
          userDisplayName: 'first',
          userImageUrl: 'test-user-image-url',
          datePosted: Timestamp.now(),
          comment: 'test-comment',
          likedBy: 1,
        },
        {
          userDisplayName: 'middle',
          userImageUrl: 'test-user-image-url',
          datePosted: Timestamp.fromMillis(new Date().getTime() - 500),
          comment: 'test-comment',
          likedBy: 1,
        },
      ];

      const sortedData: IComment[] = component.sortData(unsortedData);

      expect(sortedData[0].userDisplayName).toEqual('first');
      expect(sortedData[1].userDisplayName).toEqual('middle');
      expect(sortedData[2].userDisplayName).toEqual('last');
    });
  });

  describe('#onPublish', () => {
    it('should request firestoreService updates record', () => {
      component.onPublish();

      expect(firestoreServiceMock.getFirestore().doc).toHaveBeenCalledOnceWith(
        'posts/' + component.postId
      );
      expect(
        firestoreServiceMock.getFirestore().doc().update
      ).toHaveBeenCalled();
      expect(component.newComment.comment).toEqual('');
    });
  });

  describe('#onCancel', () => {
    it('should reset newComment comment', () => {
      component.newComment.comment = 'test-comment';
      component.onCancel();
      expect(component.newComment.comment).toEqual('');
    });
  });
});
