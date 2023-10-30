import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOptionsComponent } from './type-options.component';
import { ShopModule } from '../../../shop.module';

describe('TypeOptionsComponent', () => {
  let component: TypeOptionsComponent;
  let fixture: ComponentFixture<TypeOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule]
    });
    fixture = TestBed.createComponent(TypeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
