import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavigationComponent } from './top-navigation.component';
import { NavigationLinksMobileComponent } from '../navigation-links-mobile/navigation-links-mobile.component';
import { HomeIconComponent } from '../home-icon/home-icon.component';
import { FormsModule } from '@angular/forms';
import { NavigationLinksDesktopComponent } from '../navigation-links-desktop/navigation-links-desktop.component';
import { CartIconComponent } from '../cart-icon/cart-icon.component';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { LeftDrawComponent } from 'src/app/components/left-draw/left-draw.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopNavigationComponent', () => {
  let component: TopNavigationComponent;
  let fixture: ComponentFixture<TopNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopNavigationComponent,
        NavigationLinksMobileComponent,
        NavigationLinksDesktopComponent,
        HomeIconComponent,
        CartIconComponent,
        ProductSearchComponent,
        SignInComponent
      ],
      imports: [FormsModule, LeftDrawComponent, RouterTestingModule],
    });
    fixture = TestBed.createComponent(TopNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
