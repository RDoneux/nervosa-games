import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncmentPostComponent } from './announcment-post.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';
import { IAnnouncementPost } from '../interfaces/i-announcement-post.interface';
import { mockedAnnouncementPost } from '../../../data/test-data';

describe('AnnouncmentPostComponent', () => {
  const mockAnnouncementPost: IAnnouncementPost = mockedAnnouncementPost

  let component: AnnouncmentPostComponent;
  let fixture: ComponentFixture<AnnouncmentPostComponent>;

  let angularFirestoreMock: {'collection': jest.Mock}

  beforeEach(async () => {
    angularFirestoreMock = {
      'collection': jest.fn()
    };

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
      jest.spyOn(component, 'findPosterInformation').mockImplementation(() => {});

      component.ngAfterViewInit();

      expect(component.findPosterInformation).toHaveBeenCalledTimes(1);
    });
  });
});
