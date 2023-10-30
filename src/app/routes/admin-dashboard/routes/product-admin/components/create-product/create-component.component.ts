import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';
import { v4 } from 'uuid';
import { CreateProductService } from '../../services/create-product.service';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss'],
})
export class CreateComponentComponent {
  private emptyProduct: IProduct = {
    imageUrl: '',
    imageDescription: '',
    title: '',
    searchTitle: '',
    itemNumber: 0,
    price: 0,
    id: v4(),
    tags: [],
    dateUploaded: Timestamp.now(),
    description: '',
    isLiked: false,
    type: 'minature'
  };

  public product: IProduct = this.emptyProduct;

  constructor(private createProductService: CreateProductService) {}

  addDownloadUrl(url: string): void {
    this.product.imageUrl = url;
  }

  updateTags(tags: string[]): void {
    this.product.tags = tags;
  }

  onSubmit(): void {
    this.product.dateUploaded = Timestamp.now();
    this.product.searchTitle = this.product.title.toLowerCase();
    this.createProductService.uploadNewProduct(this.product);
    this.product = this.emptyProduct;
  }
}
