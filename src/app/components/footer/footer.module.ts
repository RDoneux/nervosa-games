import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from '../modal/modal.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './components/refund-policy/refund-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';

@NgModule({
  declarations: [FooterComponent, PrivacyPolicyComponent, RefundPolicyComponent, TermsOfServiceComponent],
  imports: [CommonModule, ModalComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
