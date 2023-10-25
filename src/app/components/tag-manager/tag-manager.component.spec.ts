import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagManagerComponent } from './tag-manager.component';

describe('TagManagerComponent', () => {
  let component: TagManagerComponent;
  let fixture: ComponentFixture<TagManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagManagerComponent],
    });
    fixture = TestBed.createComponent(TagManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onKeyPress', () => {
    it('should do nothing if event.key does not equal enter', () => {
      const event: KeyboardEvent = {
        key: 'not-enter',
        preventDefault: jasmine.createSpy(),
      } as unknown as KeyboardEvent;
      component.onKeyPress(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should do nothing if tagDraft.length is 0', () => {
      component.tagDraft = '';
      const event: KeyboardEvent = {
        key: 'Enter',
        preventDefault: jasmine.createSpy(),
      } as unknown as KeyboardEvent;

      component.onKeyPress(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
    it('should call #preventDefault and add tag to tagList if event.key is enter and tagDraft is populated', () => {
      component.tagDraft = 'test-tag';
      const event: KeyboardEvent = {
        key: 'Enter',
        preventDefault: jasmine.createSpy(),
      } as unknown as KeyboardEvent;

      component.onKeyPress(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
      expect(component.tags).toContain('test-tag');
    });
  });

  describe('#removeTag', () => {
    it('should remove specified tag from tagList', () => {
      component.tags = ['tag-to-remove'];

      component.removeTag('tag-to-remove');

      expect(component.tags).toEqual([]);
    });
    it('should do nothing to tagList if requested tag is not present', () => {
      component.tags = ['tag-to-stay'];

      component.removeTag('missing-tag');

      expect(component.tags).toEqual(['tag-to-stay']);
    });
  });
});
