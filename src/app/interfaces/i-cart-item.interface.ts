import { IProduct } from '../components/product/interfaces/i-product.interface';

export interface ICartItem extends IProduct {
  quantity: number;
}
