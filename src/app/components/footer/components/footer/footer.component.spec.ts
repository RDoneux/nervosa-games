import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { IFooterLink } from '../../interfaces/i-footer-link.interface';
import { PrivacyPolicyComponent } from '../../../../routes/policies/privacy-policy/components/privacy-policy/privacy-policy.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [ModalComponent],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#openModal', () => {
    it('should open modal and set modal content', () => {
      const footer: IFooterLink = {
        label: '',
        content: PrivacyPolicyComponent,
      };
      component.openModal(footer);
      expect(component.showModal).toBeTrue();
      expect(component.modalContent).toBeDefined();
    });
  });
});
