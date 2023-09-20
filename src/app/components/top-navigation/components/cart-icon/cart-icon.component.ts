import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debug } from 'src/app/services/debug/debug';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent {
  onCartSelected() {
    debug('method-not-implemented')(
      'onCartSelected method not currently implemented'
    );
  }
}
