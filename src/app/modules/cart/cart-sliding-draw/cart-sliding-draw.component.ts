import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-sliding-draw',
  templateUrl: './cart-sliding-draw.component.html',
  styleUrls: ['./cart-sliding-draw.component.scss'],
})
export class CartSlidingDrawComponent implements OnInit {
  @Input() show: boolean = false;

  @Output() public requestClose: EventEmitter<null> = new EventEmitter();

  @ViewChild('slidingDraw')
  private _draw!: ElementRef;
  /* istanbul ignore next */
  public get draw(): any {
    return this._draw.nativeElement;
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.draw.contains(event.target)) return;
    this.onClose();
  }

  public cartItems: ICartItem[] = [];
  public price: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems$().subscribe((res) => {
      this.cartItems = res;
    });

    this.cartService.getPrice$().subscribe((res) => (this.price = res));
  }

  onRequestProductRemoved(cartItem: ICartItem): void {
    this.cartService.removeCartItem(cartItem);
  }

  onProductUpdated(cartItem: ICartItem): void {
    this.cartService.updateCartItem(cartItem);
  }

  onClose(): void {
    this.requestClose.emit();
  }
}
