import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public price: number = 0;
  public cartItems: ICartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getPrice$().subscribe((res) => (this.price = res));
    this.cartService.getCartItems$().subscribe((res) => (this.cartItems = res));
  }
}
