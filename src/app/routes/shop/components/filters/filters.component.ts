import { Component, OnInit } from '@angular/core';
import { IFiltersObject } from '../../interfaces/i-filters-object';
import { MessageService } from 'src/app/services/message/message.service';
import { IPriceRange } from '../../interfaces/i-price-range.interface';
import { TProduct } from '../../types/t-product.type';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  constructor(private messageService: MessageService) {}

  public searchObject: IFiltersObject = {
    textSearch: '',
    gameSelect: '',
    priceRange: { min: 0, max: 100 },
    types: ['minature', 'scenery', 'supporting_material'],
  };

  ngAfterViewInit(): void {
    this.send();
  }

  onTextSearchUpdate(event: string) {
    this.searchObject.textSearch = event;
    this.send();
  }

  onGameSelectUpdate(event: string) {
    this.searchObject.gameSelect = event;
    this.send();
  }

  onPriceRangeUpdate(event: IPriceRange) {
    this.searchObject.priceRange = event;
    this.send();
  }

  onTypeUpdate(event: TProduct[]) {
    this.searchObject.types = event;
    this.send();
  }

  send(): void {
    this.messageService.send({
      stream: 'product-filters',
      sender: this.constructor.name,
      payload: this.searchObject,
    });
  }
}
