import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INavigationRoute } from './interfaces/i-navigation-route.interface';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { NavigationLinksDesktopComponent } from './components/navigation-links-desktop/navigation-links-desktop.component';
import { NavigationLinksMobileComponent } from './components/navigation-links-mobile/navigation-links-mobile.component';
import { HomeIconComponent } from './components/home-icon/home-icon.component';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [
    CommonModule,
    HomeIconComponent,
    CartIconComponent,
    NavigationLinksDesktopComponent,
    NavigationLinksMobileComponent,
  ],
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent {
  public routes: INavigationRoute[] = [
    { label: 'Shop', route: '/shop' },
    { label: 'Services', route: '/services' },
    { label: 'News', route: '/news' },
    { label: 'Games', route: '/games' },
    { label: 'About Us', route: '/about-us' },
  ];
}
