import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductModule } from '../../product.module';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  let firestoreServiceMock: any;

  beforeEach(() => {
    firestoreServiceMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      imports: [ProductModule],
      providers: [{provide: FirestoreService, useValue: firestoreServiceMock}]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
