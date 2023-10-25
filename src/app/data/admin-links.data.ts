import { IAdminRoute } from '../routes/admin-dashboard/interfaces/i-admin-route.interface';

export const adminLinks: IAdminRoute[] = [
  {
    route: '/admin-dashboard/news-admin',
    label: 'News Dashboard',
    materialIcon: 'mail',
  },
  {
    route: '/admin-dashboard/products-admin',
    label: 'Product Dashboard',
    materialIcon: 'inventory_2'
  }
];
