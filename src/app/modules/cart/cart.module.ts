import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSlidingDrawComponent } from './cart-sliding-draw/cart-sliding-draw.component';
import { LeftDrawComponent } from 'src/app/components/left-draw/components/left-draw.component';
import { CartSlidingDrawProductComponent } from './cart-sliding-draw-product/cart-sliding-draw-product.component';
import { QuantitySelectorComponent } from './quantity-selector/quantity-selector.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    CartSlidingDrawComponent,
    CartSlidingDrawProductComponent,
    QuantitySelectorComponent,
  ],
  imports: [CommonModule, LeftDrawComponent, RouterLink],
  exports: [CartSlidingDrawComponent],
})
export class CartModule {}
