import { Component, Input } from '@angular/core';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent {
  @Input({ required: true }) cartItems!: ICartItem[];

  trackByFn(index: number, cartItem: ICartItem): string {
    return cartItem.id;
  }
}
