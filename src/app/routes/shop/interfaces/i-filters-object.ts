import { TProduct } from '../types/t-product.type';
import { IPriceRange } from './i-price-range.interface';

// any additions to this will require manual setup in filters.service.ts
export interface IFiltersObject {
  textSearch: string;
  gameSelect: string;
  priceRange: IPriceRange;
  types: TProduct[];
}
