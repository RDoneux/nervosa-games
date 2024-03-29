import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsableSectionComponent } from './collapsable-section.component';

describe('CollapsableSectionComponent', () => {
  let component: CollapsableSectionComponent;
  let fixture: ComponentFixture<CollapsableSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollapsableSectionComponent],
    });
    fixture = TestBed.createComponent(CollapsableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onToggleCollapse', () => {
    it('should toggle the collapse variable', () => {
      component.collapsed = false;

      component.onToggleCollapse();

      expect(component.collapsed).toBeTrue();

      component.onToggleCollapse();

      expect(component.collapsed).toBeFalse();
    });
  });

  describe('#ngAfterViewInit', () => {
    it('should set contentHeight equal to collapsableContent scrollHeight', () => {
      spyOnProperty(component, 'content').mockReturnValue({
        scrollHeight: 1,
      } as HTMLElement);

      component.ngAfterViewInit();

      expect(component.contentHeight).toEqual(1);
    });
  });
});
