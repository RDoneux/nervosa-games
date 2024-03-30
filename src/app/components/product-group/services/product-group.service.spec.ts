import { TestBed } from '@angular/core/testing';

import { ProductGroupService } from './product-group.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IProduct } from '../../product/interfaces/i-product.interface';
import { mockedProduct } from 'src/app/data/test-data';

describe('ProductGroupService', () => {
  let service: ProductGroupService;
  let angularFirestoreMock: any;

  beforeEach(() => {
    angularFirestoreMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: angularFirestoreMock },
      ],
    });
    service = TestBed.inject(ProductGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#sortProductsByFavorites', () => {
    it('should sort products placing favorited items first', () => {
      const productList: IProduct[] = [
        { ...mockedProduct, isLiked: false },
        { ...mockedProduct, isLiked: true },
        { ...mockedProduct, isLiked: false },
        { ...mockedProduct, isLiked: true },
      ];
      const result = service.sortProductsByFavorites(productList);
      expect(result[0].isLiked).toBeTruthy();
      expect(result[1].isLiked).toBeTruthy();
      expect(result[2].isLiked).toBeFalsy();
      expect(result[3].isLiked).toBeFalsy();
    });
  });
});
