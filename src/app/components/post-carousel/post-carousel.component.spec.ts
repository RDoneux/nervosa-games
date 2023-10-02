import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCarouselComponent } from './post-carousel.component';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

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
      imports: [PostCarouselComponent],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
      ],
    });
    fixture = TestBed.createComponent(PostCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
