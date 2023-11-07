import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationLinksDesktopComponent } from './components/navigation-links-desktop/navigation-links-desktop.component';
import { NavigationLinksMobileComponent } from './components/navigation-links-mobile/navigation-links-mobile.component';
import { HomeIconComponent } from './components/home-icon/home-icon.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { LeftDrawComponent } from '../left-draw/components/left-draw.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { CartModule } from 'src/app/modules/cart/cart.module';

@NgModule({
  declarations: [
    TopNavigationComponent,
    NavigationLinksDesktopComponent,
    NavigationLinksMobileComponent,
    HomeIconComponent,
    CartIconComponent,
    ProductSearchComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeftDrawComponent,
    FormsModule,
    CartModule,
  ],
  exports: [TopNavigationComponent],
})
export class TopNavigationModule {}
