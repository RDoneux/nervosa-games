import { PrivacyPolicyComponent } from '../components/footer/components/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from '../components/footer/components/refund-policy/refund-policy.component';
import { TermsOfServiceComponent } from '../components/footer/components/terms-of-service/terms-of-service.component';
import { IFooterLink } from '../components/footer/interfaces/i-footer-link.interface';

export const footerLinks: IFooterLink[] = [
  {
    label: 'Privacy Policy',
    content: PrivacyPolicyComponent,
  },
  {
    label: 'Refund Policy',
    content: RefundPolicyComponent,
  },
  {
    label: 'Terms of Service',
    content: TermsOfServiceComponent,
  },
];
