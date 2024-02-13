import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateInDevModeGuard } from './guards/can-activate-in-dev-mode/can-activate-in-dev-mode.guard';
import { isAdminGuard } from './guards/is-admin/is-admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    data: { animation: 'fadeInOutRoute' },
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./routes/shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: 'services',
    data: { animation: 'fadeInOutRoute' },
    loadChildren: () =>
      import('./routes/services/services.module').then((m) => m.ServicesModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./routes/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./routes/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./routes/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./routes/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'playpen',
    loadChildren: () =>
      import('./routes/playpen/playpen.module').then((m) => m.PlaypenModule),
    canActivate: [canActivateInDevModeGuard],
  },
  {
    path: 'unauthorised',
    loadChildren: () =>
      import('./routes/not-authorised/not-authorised.module').then(
        (m) => m.NotAuthorisedModule
      ),
  },
  {
    path: 'policies',
    loadChildren: () =>
      import('./routes/policies/policies.module').then((m) => m.PoliciesModule),
  },
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./routes/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [isAdminGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./routes/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
