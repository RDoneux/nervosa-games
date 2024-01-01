import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductModule } from '../../product/product.module';
import { ProductGroupService } from '../services/product-group.service';
import { IProduct } from '../../product/interfaces/i-product.interface';
import { UserService } from 'src/app/services/user/user.service';
import { take } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IStoreGeneralSettings } from 'src/app/interfaces/i-store-general-settings.interface';

@Component({
  selector: 'app-product-group',
  standalone: true,
  imports: [CommonModule, ProductModule],
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss'],
})
export class ProductGroupComponent implements OnInit {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) tag!: string;
  @Input() description!: string;

  public products!: IProduct[];
  public storeGeneralSettings!: IStoreGeneralSettings | undefined;

  constructor(
    private productGroupService: ProductGroupService,
    private userService: UserService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.productGroupService
      .getProductsFromTag(this.tag)
      .subscribe((res) => {
        this.products = res;
        this.initaliseProductsLikedValue(this.products);
      });
    this.firestoreService
      .getFirestore()
      .collection('general-settings')
      .doc<IStoreGeneralSettings>('store')
      .valueChanges()
      .subscribe({
        next: (res: IStoreGeneralSettings | undefined) =>
          (this.storeGeneralSettings = res),
      });
  }

  initaliseProductsLikedValue(products: IProduct[]): IProduct[] {
    this.userService
      .getUserProductLikedList()
      .pipe(take(1))
      .subscribe({
        next: (userLikedList: string[] | null) => {
          products.map(
            (product: IProduct) =>
              (product.isLiked = userLikedList?.includes(product.id) ?? false)
          );
          this.products = this.productGroupService.sortProductsByFavorites(
            this.products
          );
        },
      });
    return products;
  }
}
