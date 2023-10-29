import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './components/shop/shop.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TextSearchComponent } from './components/filter-options/text-search/text-search.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';
import { GameSelectComponent } from './components/filter-options/game-select/game-select.component';
import { PriceSelectComponent } from './components/filter-options/price-select/price-select.component';
import { TypeOptionsComponent } from './components/filter-options/type-options/type-options.component';
import { ProductComponent } from 'src/app/components/product/components/product/product.component';
import { ProductModule } from 'src/app/components/product/product.module';

@NgModule({
  declarations: [
    ShopComponent,
    ProductSearchComponent,
    FiltersComponent,
    TextSearchComponent,
    GameSelectComponent,
    PriceSelectComponent,
    TypeOptionsComponent,
  ],

  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    UserInterfaceModule,
    ProductModule,
  ],
})
export class ShopModule {}
