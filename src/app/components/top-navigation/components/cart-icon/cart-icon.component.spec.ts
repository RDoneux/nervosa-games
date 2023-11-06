import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartIconComponent } from './cart-icon.component';
import { TopNavigationModule } from '../../top-navigation.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartIconComponent', () => {
  let component: CartIconComponent;
  let fixture: ComponentFixture<CartIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TopNavigationModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(CartIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
