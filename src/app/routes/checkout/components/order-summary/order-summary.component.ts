import { Component, OnInit } from '@angular/core';
import { deliveryPrice } from '../../../../data/checkout.data';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  subtotal: number = 0;
  delivery: number = deliveryPrice;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getPrice$().subscribe((res) => {
      this.subtotal = res;
      this.total = this.subtotal + this.delivery;
    });
  }
}
