import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCarouselComponent } from './post-carousel.component';

describe('PostCarouselComponent', () => {
  let component: PostCarouselComponent;
  let fixture: ComponentFixture<PostCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostCarouselComponent]
    });
    fixture = TestBed.createComponent(PostCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
