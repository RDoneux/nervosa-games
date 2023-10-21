import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailComponent } from './more-detail.component';

describe('MoreDetailComponent', () => {
  let component: MoreDetailComponent;
  let fixture: ComponentFixture<MoreDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreDetailComponent]
    });
    fixture = TestBed.createComponent(MoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
