import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { ShopModule } from '../../shop.module';
import { MessageService } from 'src/app/services/message/message.service';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  let messageServiceMock: { send: jest.Mock };

  beforeEach(() => {
    messageServiceMock = {
      send: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ShopModule],
      providers: [{ provide: MessageService, useValue: messageServiceMock }],
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onClick', () => {
    it('should set show to false if mobileDraw does not contain event', () => {
      component.show = true;
      component.onClick({} as MouseEvent);

      expect(component.show).toBeFalsy();
    });
    it('should not change show if mobileDraw contains event', () => {
      const mobileDraw = {
        contains: jest.fn(() => true),
      };
      jest.spyOn(component, 'mobileDraw', 'get').mockReturnValue(mobileDraw);
      component.show = true;

      component.onClick({} as MouseEvent);

      expect(component.show).toBeTruthy();
    });
  });

  describe('#ngAfterViewInit', () => {
    it('should call #send', () => {
      jest.spyOn(component, 'send').mockImplementation(() => {});

      component.ngAfterViewInit();

      expect(component.send).toHaveBeenCalledTimes(1);
    });
  });

  describe('Various update functions', () => {
    beforeEach(() => {
      component.searchObject = {
        textSearch: 'test-text-search',
        gameSelect: 'test-game-select',
        priceRange: { min: 0, max: 1 },
        types: ['minature'],
      };
    });
    it('#onTextSearchUpdate: should set searchObject.textSearch equal to given value', () => {
      component.onTextSearchUpdate('updated-text-search-value');
      expect(component.searchObject.textSearch).toEqual(
        'updated-text-search-value'
      );
    });
    it('#onGameSelectUpdate: should set searchObject.gameSelect equal to given value', () => {
      component.onGameSelectUpdate('updated-game-search-value');
      expect(component.searchObject.gameSelect).toEqual(
        'updated-game-search-value'
      );
    });
    it('#onPriceRangeUpdate: should set searchObject.priceRange equal to given value', () => {
      component.onPriceRangeUpdate({ min: 1, max: 2 });
      expect(component.searchObject.priceRange).toEqual({ min: 1, max: 2 });
    });
    it('#onPriceRangeUpdate: should set searchobject.types equal to given value', () => {
      component.onTypeUpdate(['scenery']);
      expect(component.searchObject.types).toEqual(['scenery']);
    });
    it('all update methods should call #send', () => {
      jest.spyOn(component, 'send').mockImplementation(() => {});
      component.onTextSearchUpdate('');
      expect(component.send).toHaveBeenCalledTimes(1);
      component.onGameSelectUpdate('');
      expect(component.send).toHaveBeenCalledTimes(2);
      component.onPriceRangeUpdate({ min: 0, max: 2 });
      expect(component.send).toHaveBeenCalledTimes(3);
      component.onTypeUpdate([]);
      expect(component.send).toHaveBeenCalledTimes(4);
    });
  });
});
