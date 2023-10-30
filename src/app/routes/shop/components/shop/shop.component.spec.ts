import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';
import { ShopModule } from '../../shop.module';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule],
      providers: [
        { provide: FirestoreService, useValue: getFirestoreStub('') },
      ],
    });
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
