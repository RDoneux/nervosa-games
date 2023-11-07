import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { QuantitySelectorComponent } from 'src/app/components/quantity-selector/quantity-selector.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CheckoutComponent,
    OrderSummaryComponent,
    CartItemsComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    QuantitySelectorComponent,
  ],
})
export class CheckoutModule {}
