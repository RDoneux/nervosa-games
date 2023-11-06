import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';
import { ICartItem } from 'src/app/interfaces/i-cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: ICartItem[] = [];
  private cartItems$: ReplaySubject<ICartItem[]> = new ReplaySubject();
  private price$: ReplaySubject<number> = new ReplaySubject();

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
    let existingCartIndex: number = this.cartItems.findIndex(
      (cartItemLoop: ICartItem) => cartItemLoop.id === cartItem.id
    );

    if (existingCartIndex === -1) return;
    this.cartItems[existingCartIndex] = cartItem;

    this.cartItems$.next(this.cartItems);
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

  calculateProductPriceIncludingQuantity(cartItem: ICartItem): number {
    return cartItem.quantity * cartItem.price;
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
