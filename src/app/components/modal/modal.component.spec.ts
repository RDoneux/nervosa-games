import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModalComponent],
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onClickOutsidePage', () => {
    it('should call request close if click is ouside page', () => {
      component.modalPage = { nativeElement: { contains: () => false } };
      jest.spyOn(component, 'requestClose').mockImplementation(() => {});

      component.onClickOutsidePage(new MouseEvent('click'));

      expect(component.requestClose).toHaveBeenCalledTimes(1);
    });

    it('should do nothing if click is inside page', () => {
      component.modalPage = { nativeElement: { contains: () => true } };
      jest.spyOn(component, 'requestClose').mockImplementation(() => {});

      component.onClickOutsidePage(new MouseEvent('click'));

      expect(component.requestClose).not.toHaveBeenCalled();
    });
  });

  describe('#requestClose', () => {
    it('should emit request close', () => {
      jest.spyOn(component.closeRequested, 'emit').mockImplementation();

      component.requestClose();

      expect(component.closeRequested.emit).toHaveBeenCalledWith();
    });
  });
});
