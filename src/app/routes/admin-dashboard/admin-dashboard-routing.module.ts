import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

/* istanbul ignore next */
const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  {
    path: 'news-admin',
    loadChildren: () =>
      import('./routes/news-admin/news-admin.module').then(
        (m) => m.NewsAdminModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
