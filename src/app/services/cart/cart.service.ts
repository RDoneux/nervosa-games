import { Injectable } from '@angular/core';
import { Observable, Subject, from, of } from 'rxjs';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: ICartItem[] = [];
  private cartItems$: Subject<ICartItem[]> = new Subject();
  private price$: Subject<number> = new Subject();

  constructor() {}

  getCartItems$(): Observable<ICartItem[]> {
    return this.cartItems$;
  }

  getPrice$(): Observable<number> {
    return this.price$;
  }

  addCartItem(product: IProduct): void {
    const newCartItem: ICartItem = this.generateCartItemFromIProduct(product);
    const existingCartItem: ICartItem | undefined = this.cartItems.find(
      (cartItem: ICartItem) => newCartItem.id === cartItem.id
    );
    if (existingCartItem) return;
    this.cartItems.push(newCartItem);
    this.cartItems$.next(this.cartItems);
    this.price$.next(this.calculatePrice());
  }

  updateCartItem(cartItem: ICartItem): void {
    let existingCartItem = this.cartItems.find(
      (cartItem: ICartItem) => cartItem.id === cartItem.id
    );
    if (!cartItem) return;
    existingCartItem = cartItem;
    this.price$.next(this.calculatePrice());
  }

  removeCartItem(product: IProduct): void {
    this.cartItems = this.cartItems.filter(
      (productFromList: IProduct) => productFromList.id !== product.id
    );
    this.cartItems$.next(this.cartItems);
  }

  generateCartItemFromIProduct(product: IProduct): ICartItem {
    return { ...product, quantity: 1 };
  }

  private calculatePrice(): number {
    return +this.cartItems
      .reduce(
        (accumlicator: number, value: ICartItem) =>
          (accumlicator += value.price * value.quantity),
        0
      )
      .toFixed(2);
  }
}
