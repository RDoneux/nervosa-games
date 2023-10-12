import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policies.component';

const routes: Routes = [
  { path: '', component: PoliciesComponent },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: 'refund-policy',
    loadChildren: () =>
      import('./refund-policy/refund-policy.module').then(
        (m) => m.RefundPolicyModule
      ),
  },
  {
    path: 'terms-of-service',
    loadChildren: () =>
      import('./terms-of-service/terms-of-service.module').then(
        (m) => m.TermsOfServiceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliciesRoutingModule {}
