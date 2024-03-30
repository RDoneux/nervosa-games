import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { FiltersService } from '../../services/filters/filters.service';
import { MessageService } from 'src/app/services/message/message.service';
import { ShopModule } from '../../shop.module';
import { of } from 'rxjs';
import { mockedProduct } from 'src/app/data/test-data';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  let filtersServiceMock: { search: jest.Mock };
  let messageServiceMock: { getStreams$: jest.Mock };

  beforeEach(() => {
    filtersServiceMock = {
      search: jest.fn(),
    };
    messageServiceMock = {
      getStreams$: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ShopModule],
      providers: [
        { provide: MessageService, useValue: messageServiceMock },
        { provide: FiltersService, useValue: filtersServiceMock },
        { provide: FirestoreService, useValue: getFirestoreStub('') },
      ],
    });

    filtersServiceMock.search.mockReturnValue(of([mockedProduct]));
    messageServiceMock.getStreams$.mockReturnValue(
      of({ payload: {}, stream: '', sender: '' })
    );

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
