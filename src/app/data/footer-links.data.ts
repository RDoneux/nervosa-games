import { PrivacyPolicyComponent } from '../routes/policies/privacy-policy/components/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from '../routes/policies/refund-policy/components/refund-policy/refund-policy.component';
import { TermsOfServiceComponent } from '../routes/policies/terms-of-service/components/terms-of-service/terms-of-service.component';
import { IFooterLink } from '../components/footer/interfaces/i-footer-link.interface';

export const footerLinks: IFooterLink[] = [
  {
    label: 'Privacy Policy',
    content: PrivacyPolicyComponent,
    url: '/policies/privacy-policy',
  },
  {
    label: 'Refund Policy',
    content: RefundPolicyComponent,
    url: '/policies/refund-policy',
  },
  {
    label: 'Terms of Service',
    content: TermsOfServiceComponent,
    url: '/policies/terms-of-service',
  },
];
