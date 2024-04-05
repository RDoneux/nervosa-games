import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextInputComponent } from './rich-text-input.component';
import { By } from '@angular/platform-browser';

describe('RichTextInputComponent', () => {
  let component: RichTextInputComponent;
  let fixture: ComponentFixture<RichTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RichTextInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngAfterViewInit', () => {
    it('should display text content', () => {
      component.text = `{
        "ops": [
            {
                "insert": "Gandalf",
                "attributes": {
                    "bold": true
                }
            }
        ]
    }`;

      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.ql-editor')).nativeElement;
      expect(content).toBeDefined();
      expect(content.querySelector('p').textContent).toBeDefined()
      expect(content.querySelector('p').textContent).toEqual("Gandalf")
    });

    it('should disable editior if mode is display', () => {
      component.mode = 'display';
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.css('.ql-container'));
      expect(content.classes['ql-disabled']).toBeDefined();
    })

    it('should show a toolbar if mode is set to edit', () => {
      component.mode = 'edit';
      fixture.detectChanges();

      const qlToolbar = fixture.debugElement.query(By.css('.ql-toolbar'));
      expect(qlToolbar).toBeDefined();
    });
    it('should not show a toolbar if mode is set to display', () => {
      component.mode = 'display';
      fixture.detectChanges();

      const qlToolbar = fixture.debugElement.query(By.css('.ql-toolbar'));
      expect(qlToolbar).toBeNull();
    });
  });

  describe('#getContent', () => {
    it('should return a stringified version of the quillInput', () => {
      fixture.detectChanges();
      expect(component.getContent()).toEqual('{"ops":[{"insert":"\\n"}]}')
    })
  })
});
