import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupComponent } from './product-group.component';
import { ProductGroupService } from '../services/product-group.service';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

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
        { provide: FirestoreService, useValue: getFirestoreStub('') },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
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
