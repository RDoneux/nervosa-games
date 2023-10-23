import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PostCarouselComponent } from 'src/app/components/post-carousel/post-carousel.component';
import { ProductGroupComponent } from 'src/app/components/product-group/components/product-group.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PostCarouselComponent,
    ProductGroupComponent
  ]
})
export class HomeModule { }
