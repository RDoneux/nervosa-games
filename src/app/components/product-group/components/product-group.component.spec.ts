import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupComponent } from './product-group.component';
import { ProductGroupService } from '../services/product-group.service';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';

describe('ProductGroupComponent', () => {
  let component: ProductGroupComponent;
  let fixture: ComponentFixture<ProductGroupComponent>;

  let productGroupServiceMock: jasmine.SpyObj<ProductGroupService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    productGroupServiceMock = jasmine.createSpyObj('ProductGroupService', [
      'getProductsFromTag',
      'sortProductsByFavorites',
    ]);
    userService = jasmine.createSpyObj('UserService', [
      'getUserProductLikedList',
    ]);
    TestBed.configureTestingModule({
      imports: [ProductGroupComponent],
      providers: [
        { provide: ProductGroupService, useValue: productGroupServiceMock },
        { provide: UserService, useValue: userService },
      ],
    });
    fixture = TestBed.createComponent(ProductGroupComponent);
    component = fixture.componentInstance;

    productGroupServiceMock.getProductsFromTag.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
