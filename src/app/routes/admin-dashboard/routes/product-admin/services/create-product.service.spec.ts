import { TestBed } from '@angular/core/testing';

import { CreateProductService } from './create-product.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { mockedProduct } from 'src/app/data/test-data.spec';

describe('CreateProductService', () => {
  let service: CreateProductService;
  let angularFirestoreMock: any;

  beforeEach(() => {
    angularFirestoreMock = getFirestoreStub('');
    TestBed.configureTestingModule({
      providers: [
        { provide: FirestoreService, useValue: angularFirestoreMock },
      ],
    });
    service = TestBed.inject(CreateProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#uploadNewProduct', () => {
    it('request product collection and call set with mockedProduct', () => {
      service.uploadNewProduct(mockedProduct);

      expect(angularFirestoreMock.getFirestore).toHaveBeenCalledTimes(1);
      expect(angularFirestoreMock.getFirestore().collection).toHaveBeenCalledOnceWith('products');
      expect(angularFirestoreMock.getFirestore().collection().doc).toHaveBeenCalledTimes(1);
      expect(angularFirestoreMock.getFirestore().collection().doc().set).toHaveBeenCalledOnceWith(mockedProduct);

    })
  })
});
