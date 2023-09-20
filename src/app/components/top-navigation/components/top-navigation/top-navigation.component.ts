import { Component } from '@angular/core';
import { INavigationRoute } from '../../interfaces/i-navigation-route.interface';

@Component({
  selector: 'app-top-navigation',
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
