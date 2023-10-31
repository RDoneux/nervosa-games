import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';

@Component({
  selector: 'app-cart-sliding-draw-product',
  templateUrl: './cart-sliding-draw-product.component.html',
  styleUrls: ['./cart-sliding-draw-product.component.scss'],
})
export class CartSlidingDrawProductComponent {
  @Input({ required: true }) cartItem!: ICartItem;

  @Output() requestRemoved: EventEmitter<null> = new EventEmitter();
  @Output() updated: EventEmitter<ICartItem> = new EventEmitter();

  onQuantityChanged(event: number) {
    if (event === 0) {
      this.requestRemoved.emit();
    }
    this.cartItem.quantity = event;
    this.updated.emit(this.cartItem);
  }
}
