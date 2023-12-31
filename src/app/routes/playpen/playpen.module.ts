import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaypenRoutingModule } from './playpen-routing.module';
import { PlaypenComponent } from './playpen.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';
import { AnnouncmentPostComponent } from 'src/app/components/announcment-post/components/announcment-post.component';
import { ProductModule } from 'src/app/components/product/product.module';
import { ProductGroupComponent } from 'src/app/components/product-group/components/product-group.component';

@NgModule({
  declarations: [PlaypenComponent],
  imports: [
    CommonModule,
    PlaypenRoutingModule,
    UserInterfaceModule,
    FormsModule,
    AnnouncmentPostComponent,
    ProductModule,
    ProductGroupComponent
  ],
})
export class PlaypenModule {}
