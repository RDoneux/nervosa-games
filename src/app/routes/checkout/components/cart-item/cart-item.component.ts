import { Component, Input, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input({ required: true }) cartItem!: ICartItem;

  public totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.totalPrice = this.cartService.calculateProductPriceIncludingQuantity(
      this.cartItem
    );
  }

  onQuantityChanged(event: number): void {
    this.cartItem.quantity = event;
    this.totalPrice = this.cartService.calculateProductPriceIncludingQuantity(
      this.cartItem
    );
    this.cartService.updateCartItem(this.cartItem);
  }
}
