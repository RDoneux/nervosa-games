import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { PostCarouselComponent } from './post-carousel.component';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IAnnouncementPost } from '../announcment-post/interfaces/i-announcement-post.interface';

const mockAnnouncementPost: IAnnouncementPost = {
  id: 'test-id',
  seenBy: 0,
  likedBy: 1,
  posterId: 'test-poster-id',
  timestamp: new Date(),
  title: 'test-title',
  backgroundImageAlt: 'test-alt-background',
  backgroundImageUrl: 'test-background-url',
  content: 'test-content',
  comments: [{ userId: 'test-user-id', comment: 'test-comment' }],
};

describe('PostCarouselComponent', () => {
  let component: PostCarouselComponent;
  let fixture: ComponentFixture<PostCarouselComponent>;

  const firestoreData = from([[{}]]);
  const collectionStub = {
    valueChanges: jasmine
      .createSpy('valueChanges')
      .and.returnValue(firestoreData),
  };
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PostCarouselComponent,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    fixture = TestBed.createComponent(PostCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#incrementCarousel', () => {
    it('should increment offsetX when posts.length is less than offsetWidth', () => {
      spyOnProperty(component, 'carouselContainer').and.returnValue({
        offsetWidth: 3,
      } as HTMLDivElement);

      component.posts = [
        mockAnnouncementPost,
        mockAnnouncementPost,
        mockAnnouncementPost,
        mockAnnouncementPost,
      ];
      component.incrementCarousel();

      expect(component.offsetX).toEqual(-1);
    });

    it('should reset offsetX to 0 when post.length is less than offsetWidth', () => {
      component.offsetX = 1;
      spyOnProperty(component, 'carouselContainer').and.returnValue({
        offsetWidth: 3,
      } as HTMLDivElement);
      component.posts = []
      component.incrementCarousel();

      expect(component.offsetX).toEqual(0)
    });
  });
});
