import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSearchComponent } from './text-search.component';
import { ShopModule } from '../../../shop.module';

describe('TextSearchComponent', () => {
  let component: TextSearchComponent;
  let fixture: ComponentFixture<TextSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule],
    });
    fixture = TestBed.createComponent(TextSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
