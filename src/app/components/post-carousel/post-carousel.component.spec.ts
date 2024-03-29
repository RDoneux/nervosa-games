import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { PostCarouselComponent } from './post-carousel.component';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IAnnouncementPost } from '../announcment-post/interfaces/i-announcement-post.interface';
import { mockedAnnouncementPost } from 'src/app/data/test-data.spec';

const mockAnnouncementPost: IAnnouncementPost = mockedAnnouncementPost;

describe('PostCarouselComponent', () => {
  let component: PostCarouselComponent;
  let fixture: ComponentFixture<PostCarouselComponent>;

  const firestoreData = from([[{}]]);
  const collectionStub = {
    valueChanges: jest.fn(() => firestoreData),
  };
  const angularFirestoreStub = {
    collection: jest.fn(() => collectionStub),
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
      jest
        .spyOn(component, 'carouselContainer', 'get')
        .mockReturnValue({ offsetWidth: 3 } as HTMLDivElement);

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
      jest
        .spyOn(component, 'carouselContainer', 'get')
        .mockReturnValue({ offsetWidth: 3 } as HTMLDivElement);
      component.posts = [];
      component.incrementCarousel();

      expect(component.offsetX).toEqual(0);
    });
  });
});
