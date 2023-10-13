import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAdminComponent } from './news-admin.component';

describe('NewsAdminComponent', () => {
  let component: NewsAdminComponent;
  let fixture: ComponentFixture<NewsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsAdminComponent]
    });
    fixture = TestBed.createComponent(NewsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
