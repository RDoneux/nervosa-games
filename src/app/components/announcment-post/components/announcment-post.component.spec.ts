import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncmentPostComponent } from './announcment-post.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IAnnouncementPost } from '../interfaces/i-announcement-post.interface';
import { mockedAnnouncementPost } from 'src/app/data/test-data.spec';

describe('AnnouncmentPostComponent', () => {
  const mockAnnouncementPost: IAnnouncementPost = mockedAnnouncementPost

  let component: AnnouncmentPostComponent;
  let fixture: ComponentFixture<AnnouncmentPostComponent>;

  let angularFirestoreMock: jasmine.SpyObj<AngularFirestore>;

  beforeEach(async () => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', [
      'collection',
    ]);
    TestBed.configureTestingModule({
      imports: [AnnouncmentPostComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });

    fixture = TestBed.createComponent(AnnouncmentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngAfterViewInit', () => {
    it('should call #findPosterInformation if announcementPost is defined', () => {
      component.announcementPost = mockAnnouncementPost;
      spyOn(component, 'findPosterInformation');

      component.ngAfterViewInit();

      expect(component.findPosterInformation).toHaveBeenCalledTimes(1);
    });
  });
});
