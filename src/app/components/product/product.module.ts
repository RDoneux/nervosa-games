import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { MoreDetailComponent } from './components/more-detail/more-detail.component';
import { ModalComponent } from '../modal/modal.component';

@NgModule({
  declarations: [ProductComponent, MoreDetailComponent],
  imports: [CommonModule, ModalComponent],
  exports: [ProductComponent],
})
export class ProductModule {}
