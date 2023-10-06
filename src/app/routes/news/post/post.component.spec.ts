import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from './services/post/post.service';
import {
  mockedAnnouncementPost,
  mockedUser,
} from 'src/app/data/test-data.spec';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postServiceMock: jasmine.SpyObj<PostService>;
  let mockedRoute = { queryParams: of('') };

  beforeEach(() => {
    postServiceMock = jasmine.createSpyObj('PostService', [
      'getPost',
      'getUser',
      'updateSeenBy',
    ]);
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: PostService, useValue: postServiceMock },
        { provide: ActivatedRoute, useValue: mockedRoute },
      ],
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#fetchPost', () => {
    beforeEach(() => {
      postServiceMock.getPost.and.returnValue(of([mockedAnnouncementPost]));
      postServiceMock.getUser.and.returnValue(of([mockedUser]));
    });

    it('should set the post', () => {
      component.ngOnInit();
      expect(postServiceMock.getPost).toHaveBeenCalled()
      expect(component.post).toEqual(mockedAnnouncementPost);
    });

    it('should set user', () => {
      component.ngOnInit();
      expect(postServiceMock.getUser).toHaveBeenCalledTimes(1)
      expect(component.user).toEqual(mockedUser);
    });

    it('should request seenBy value be updated', () => {
      component.ngOnInit();
      expect(postServiceMock.updateSeenBy).toHaveBeenCalledTimes(1);
    })
  });
});
