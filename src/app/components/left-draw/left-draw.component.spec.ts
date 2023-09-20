import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftDrawComponent } from './left-draw.component';

describe('LeftDrawComponent', () => {
  let component: LeftDrawComponent;
  let fixture: ComponentFixture<LeftDrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LeftDrawComponent]
    });
    fixture = TestBed.createComponent(LeftDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
