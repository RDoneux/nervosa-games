import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsableSectionComponent } from './collapsable-section.component';

describe('CollapsableSectionComponent', () => {
  let component: CollapsableSectionComponent;
  let fixture: ComponentFixture<CollapsableSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsableSectionComponent]
    });
    fixture = TestBed.createComponent(CollapsableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
