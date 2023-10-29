import { Timestamp } from '@angular/fire/firestore';
import { TProduct } from 'src/app/routes/shop/types/t-product.type';

export interface IProduct {
  imageUrl: string;
  imageDescription: string;
  title: string;
  searchTitle: string;
  itemNumber: number;
  price: number;
  id: string;
  tags: string[];
  dateUploaded: Timestamp;
  description: string;
  isLiked: boolean;
  type: TProduct;
}
