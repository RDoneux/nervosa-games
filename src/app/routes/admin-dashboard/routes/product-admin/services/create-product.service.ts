import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProductService {
  constructor(private firestoreService: FirestoreService) {}

  uploadNewProduct(product: IProduct): void {
    this.firestoreService
      .getFirestore()
      .collection('products')
      .doc()
      .set(product);
  }
}
