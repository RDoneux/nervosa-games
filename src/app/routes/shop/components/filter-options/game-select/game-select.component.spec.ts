import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSelectComponent } from './game-select.component';
import { ShopModule } from '../../../shop.module';

describe('GameSelectComponent', () => {
  let component: GameSelectComponent;
  let fixture: ComponentFixture<GameSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopModule],
    });
    fixture = TestBed.createComponent(GameSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onChange', () => {
    it('should emit value converted to lower case', () => {
      jest.spyOn(component.update, 'emit').mockImplementation(() => {});

      component.onChange('ThIs Is ThE vAlUe');

      expect(component.update.emit).toHaveBeenCalledWith(
        'this is the value'
      );
    });
  });
});
