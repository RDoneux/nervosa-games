import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponentComponent } from './create-component.component';
import { ProductAdminModule } from '../../product-admin.module';
import { getStorageStub } from 'src/app/services/cloud-storage/storage-testing';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';
import { CreateProductService } from '../../services/create-product.service';
import { mockedProduct } from 'src/app/data/test-data.spec';

describe('CreateComponentComponent', () => {
  let component: CreateComponentComponent;
  let fixture: ComponentFixture<CreateComponentComponent>;

  let firestoreStorageMock: any;

  let createProductServiceMock: jasmine.SpyObj<CreateProductService>;

  beforeEach(() => {
    firestoreStorageMock = getStorageStub('');
    createProductServiceMock = {
      'uploadNewProduct': jest.fn()
    };
    TestBed.configureTestingModule({
      imports: [ProductAdminModule],
      providers: [
        { provide: CreateProductService, useValue: createProductServiceMock },
        { provide: StorageService, useValue: firestoreStorageMock },
      ],
    });
    fixture = TestBed.createComponent(CreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#addDownloadUrl', () => {
    it('should set product.imageUrl to specified string', () => {
      component.addDownloadUrl('test-image-url');

      expect(component.product.imageUrl).toEqual('test-image-url');
    });
  });

  describe('#updateTags', () => {
    it('should set product.tags to specified string array', () => {
      component.updateTags(['test-tag-one', 'test-tag-two']);

      expect(component.product.tags).toEqual(['test-tag-one', 'test-tag-two']);
    });
  });

  describe('#onSubmit', () => {
    it('should populate product.dateUploaded', () => {
      component.onSubmit();

      expect(component.product.dateUploaded).toBeDefined();
    });
    it('should call createProductService #uploadNewProduct with mocked product', () => {
      component.product = mockedProduct;

      component.onSubmit();

      expect(
        createProductServiceMock.uploadNewProduct
      ).toHaveBeenCalledOnceWith(mockedProduct);
    });
    it('should reset product after submit', () => {
      component.product = mockedProduct;

      component.onSubmit();

      expect(component.product.imageUrl).toEqual('');
      expect(component.product.title).toEqual('');
      expect(component.product.itemNumber).toEqual(0);
      expect(component.product.price).toEqual(0);
      expect(component.product.tags).toEqual([]);
      expect(component.product.description).toEqual('');

      expect(component.product.id).toBeDefined();
      expect(component.product.dateUploaded).toBeDefined();
      expect(component.product.isLiked).toBeFalse();
    });
  });
});
