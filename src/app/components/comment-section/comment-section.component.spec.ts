import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSectionComponent } from './comment-section.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { mockedUser } from 'src/app/data/test-data.spec';

describe('CommentSectionComponent', () => {
  let component: CommentSectionComponent;
  let fixture: ComponentFixture<CommentSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommentSectionComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
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
});
