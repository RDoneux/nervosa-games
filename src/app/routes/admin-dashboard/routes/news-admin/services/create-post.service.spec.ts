import { TestBed } from '@angular/core/testing';

import { CreatePostService } from './create-post.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { mockedAnnouncementPost } from 'src/app/data/test-data';

describe('CreatePostService', () => {
  let service: CreatePostService;
  let angularFirestoreServiceMock: any

  beforeEach(() => {
    angularFirestoreServiceMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: angularFirestoreServiceMock },
      ],
    });
    service = TestBed.inject(CreatePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#uploadPost', () => {
    it('should request doc with post id', () => {
      service.uploadPost(mockedAnnouncementPost);

      expect(angularFirestoreServiceMock.getFirestore).toHaveBeenCalledTimes(1)
      expect(angularFirestoreServiceMock.getFirestore().doc).toHaveBeenCalledWith(`posts/${mockedAnnouncementPost.id}`);
    })

    it('should call set with given argument', () => {
      service.uploadPost(mockedAnnouncementPost);
      
      expect(angularFirestoreServiceMock.getFirestore().doc().set).toHaveBeenCalledWith(mockedAnnouncementPost)
    })
  })
});
