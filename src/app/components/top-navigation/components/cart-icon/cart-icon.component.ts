import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debug } from 'src/app/services/debug/debug';
import { CartService } from 'src/app/services/cart/cart.service';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent implements OnInit {
  public itemsInCart: ICartItem[] = [];
  public showDraw: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .getCartItems$()
      .subscribe((res) => (this.itemsInCart = res));
  }

  onCartSelected(event: MouseEvent) {
    this.showDraw = true;
    event.stopPropagation();
  }

  onCloseDraw(): void {
    this.showDraw = false;
  }
}
