import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ShareComponent } from './share.component';
import { PostModule } from '../../post.module';

describe('ShareComponent', () => {
  let component: ShareComponent;
  let fixture: ComponentFixture<ShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ShareComponent);
    component = fixture.componentInstance;

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#saveValueToClipboard', () => {

    it('should set copied to true', () => {
      component.copied = false;
      component.saveValueToClipboard();

      expect(component.copied).toBeTruthy();
    })

    it('should call the navigator writeText method', () => {
      component.saveValueToClipboard();
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    });

    it('should attempt to save the correct value to the clipboard', () => {
      Object.assign(location, {
        href: jest.fn().mockReturnValue('test-url'),
      });

      component.image = 'test-image';
      component.subTitle = 'test-subtitle';
      component.title = 'test-title';

      component.saveValueToClipboard();

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        `${environment.apiRoot}/share?image=test-image&url=http://localhost/&subTitle=test-subtitle&title=test-title`
      );
    });
  });
});
