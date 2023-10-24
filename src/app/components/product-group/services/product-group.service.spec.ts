import { TestBed } from '@angular/core/testing';

import { ProductGroupService } from './product-group.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IProduct } from '../../product/interfaces/i-product.interface';
import { mockedProduct } from 'src/app/data/test-data.spec';

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

  describe('#getProductsFromTag', () => {
    it('should call firestoreService for value changes', () => {
      service.getProductsFromTag('');

      expect(angularFirestoreMock.getFirestore).toHaveBeenCalledTimes(1);
      expect(
        angularFirestoreMock.getFirestore().collection
      ).toHaveBeenCalledOnceWith('products', jasmine.any(Function));
      expect(
        angularFirestoreMock.getFirestore().collection().valueChanges
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('#sortProductsByFavorites', () => {
    it('should sort products placing favorited items first', () => {
      const productList: IProduct[] = [
        mockedProduct,
        { ...mockedProduct, isLiked: true },
        mockedProduct,
        { ...mockedProduct, isLiked: true },
      ];
      const result = service.sortProductsByFavorites(productList);
      expect(result[0].isLiked).toBeTrue();
      expect(result[1].isLiked).toBeTrue();
      expect(result[2].isLiked).toBeFalse();
      expect(result[3].isLiked).toBeFalse();
    });
  });
});
