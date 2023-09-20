import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationLinksDesktopComponent } from './components/navigation-links-desktop/navigation-links-desktop.component';
import { NavigationLinksMobileComponent } from './components/navigation-links-mobile/navigation-links-mobile.component';
import { HomeIconComponent } from './components/home-icon/home-icon.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { LeftDrawComponent } from '../left-draw/left-draw.component';

@NgModule({
  declarations: [
    TopNavigationComponent,
    NavigationLinksDesktopComponent,
    NavigationLinksMobileComponent,
    HomeIconComponent,
    CartIconComponent,
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive, LeftDrawComponent],
  exports: [TopNavigationComponent],
})
export class TopNavigationModule {}
