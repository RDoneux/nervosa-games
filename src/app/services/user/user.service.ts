import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLikedProducts!: ReplaySubject<string[] | null>;

  constructor(private loginService: LoginService) {}

  getUserProductLikedList(): Observable<string[] | null> {
    if (!this.userLikedProducts) {
      this.userLikedProducts = new ReplaySubject();
    }

    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => {
        this.userLikedProducts.next(user?.likedProducts ?? null);
      },
    });
    return this.userLikedProducts;
  }

  addProductToLikedList(productId: string): void {
    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => {
        if (!user) return;
        user.likedProducts.push(productId);
        this.userLikedProducts.next(user.likedProducts);
        this.loginService.saveUserToDatabase(user);
      },
    });
  }

  removeProductFromLikedList(productId: string): void {
    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => {
        if (!user) return;
        user.likedProducts = user.likedProducts.filter(
          (value: string) => value !== productId
        );
        this.userLikedProducts.next(user.likedProducts);
        this.loginService.saveUserToDatabase(user);
      },
    });
  }
}
