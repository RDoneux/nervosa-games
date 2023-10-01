import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncmentPostComponent } from './announcment-post.component';

describe('AnnouncmentPostComponent', () => {
  let component: AnnouncmentPostComponent;
  let fixture: ComponentFixture<AnnouncmentPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnnouncmentPostComponent]
    });
    fixture = TestBed.createComponent(AnnouncmentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
