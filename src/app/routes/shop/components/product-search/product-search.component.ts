import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../../services/filters/filters.service';
import { IFiltersObject } from '../../interfaces/i-filters-object';
import { MessageService } from 'src/app/services/message/message.service';
import { distinctUntilChanged } from 'rxjs';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  public products!: IProduct[];

  constructor(
    private filtersService: FiltersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService
      .getStreams$(['product-filters'])
      .pipe(distinctUntilChanged())
      .subscribe((res) => this.search(res.payload));
  }

  search(searchObject: IFiltersObject): void {
    this.filtersService
      .search(searchObject)
      .subscribe((res) => (this.products = res));
  }
}
