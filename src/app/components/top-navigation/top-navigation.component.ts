import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INavigationRoute } from './interfaces/i-navigation-route.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartIconComponent } from '../cart-icon/cart-icon.component';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CartIconComponent],
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
