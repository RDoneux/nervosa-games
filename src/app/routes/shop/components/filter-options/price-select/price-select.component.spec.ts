import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSelectComponent } from './price-select.component';

describe('PriceSelectComponent', () => {
  let component: PriceSelectComponent;
  let fixture: ComponentFixture<PriceSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceSelectComponent]
    });
    fixture = TestBed.createComponent(PriceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
