import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSelectComponent } from './price-select.component';
import { ShopModule } from '../../../shop.module';

describe('PriceSelectComponent', () => {
  let component: PriceSelectComponent;
  let fixture: ComponentFixture<PriceSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule],
    });
    fixture = TestBed.createComponent(PriceSelectComponent);
    component = fixture.componentInstance;

    component.priceRange = { min: 1, max: 2 };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
