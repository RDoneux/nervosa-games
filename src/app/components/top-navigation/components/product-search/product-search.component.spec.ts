import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSearchComponent, SignInComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
