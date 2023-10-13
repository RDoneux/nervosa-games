import { Component } from '@angular/core';
import { IAdminRoute } from './interfaces/i-admin-route.interface';
import { adminLinks } from 'src/app/data/admin-links.data';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  public adminRoutes: IAdminRoute[] = adminLinks;
}
