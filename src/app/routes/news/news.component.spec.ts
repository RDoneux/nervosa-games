import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
