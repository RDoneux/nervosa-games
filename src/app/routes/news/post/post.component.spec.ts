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
import { LoginService } from 'src/app/services/login/login.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postServiceMock: jasmine.SpyObj<PostService>;
  let mockedRoute = { queryParams: of('') };
  let loginServiceMock: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    postServiceMock = {
      'getPost': jest.fn(),
      'getUser': jest.fn(),
      'updateSeenBy': jest.fn()
    };
    loginServiceMock = {
      'requestUserLogsIn': jest.fn(),
      'getCurrentLoggedInUser': jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: PostService, useValue: postServiceMock },
        { provide: ActivatedRoute, useValue: mockedRoute },
        { provide: LoginService, useValue: loginServiceMock },
      ],
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(mockedUser));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#fetchPost', () => {
    beforeEach(() => {
      postServiceMock.getPost.mockReturnValue(of([mockedAnnouncementPost]));
      postServiceMock.getUser.mockReturnValue(of([mockedUser]));
    });

    it('should set the post', () => {
      component.ngOnInit();
      expect(postServiceMock.getPost).toHaveBeenCalled();
      expect(component.post).toEqual(mockedAnnouncementPost);
    });

    it('should set user', () => {
      component.ngOnInit();
      expect(postServiceMock.getUser).toHaveBeenCalledTimes(1);
      expect(component.user).toEqual(mockedUser);
    });

    it('should request seenBy value be updated', () => {
      component.ngOnInit();
      expect(postServiceMock.updateSeenBy).toHaveBeenCalledTimes(1);
    });
  });
});
