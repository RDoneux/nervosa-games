import { Injectable } from '@angular/core';
import { IProduct } from '../../product/interfaces/i-product.interface';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ProductGroupService {
  constructor(private firestoreService: FirestoreService) {}

  /* istanbul ignore next */
  getProductsFromTag(tagList: string): Observable<IProduct[]> {
    return this.firestoreService
      .getFirestore()
      .collection<IProduct>('products', (ref) =>
        ref.where('tags', 'array-contains', tagList.toLowerCase())
      )
      .valueChanges();
  }

  sortProductsByFavorites(products: IProduct[]): IProduct[] {
    return products.sort((a: IProduct, b: IProduct) =>
      a.isLiked === b.isLiked ? 0 : a.isLiked ? -1 : 1
    );
  }
}
