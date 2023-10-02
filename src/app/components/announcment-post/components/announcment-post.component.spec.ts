import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncmentPostComponent } from './announcment-post.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('AnnouncmentPostComponent', () => {
  let component: AnnouncmentPostComponent;
  let fixture: ComponentFixture<AnnouncmentPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnnouncmentPostComponent],
      providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }]
    });
    fixture = TestBed.createComponent(AnnouncmentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
