import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailComponent } from './more-detail.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ProductModule } from '../../product.module';
import { mockedProduct } from 'src/app/data/test-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MoreDetailComponent', () => {
  let component: MoreDetailComponent;
  let fixture: ComponentFixture<MoreDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductModule, ModalComponent, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(MoreDetailComponent);
    component = fixture.componentInstance;

    component.product = mockedProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onCloseRequested', () => {
    it('should emit on closeRequested eventEmitter', () => {
      jest.spyOn(component.closeRequested, 'emit').mockImplementation(() => {});
      component.onCloseRequested();
      expect(component.closeRequested.emit).toHaveBeenCalled();
    });
  });
});
