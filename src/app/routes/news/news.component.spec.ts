import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { mockedAnnouncementPost } from 'src/app/data/test-data.spec';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AnnouncmentPostComponent } from 'src/app/components/announcment-post/components/announcment-post.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let firestoreServiceMock: any;

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub([mockedAnnouncementPost]);
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [
        AnnouncmentPostComponent,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: FirestoreService, useValue: firestoreServiceMock },
      ],
    });
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  describe('#ngOnInit', () => {
    it('should request posts collection', () => {
      component.ngOnInit();

      expect(firestoreServiceMock.getFirestore).toHaveBeenCalled();
      expect(
        firestoreServiceMock.getFirestore().collection
      ).toHaveBeenCalledOnceWith('posts', jasmine.any(Function));
      expect(component.posts).toEqual([mockedAnnouncementPost]);
    });
  });
});
