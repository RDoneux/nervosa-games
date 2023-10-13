import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsAdminRoutingModule } from './news-admin-routing.module';
import { NewsAdminComponent } from './news-admin.component';


@NgModule({
  declarations: [
    NewsAdminComponent
  ],
  imports: [
    CommonModule,
    NewsAdminRoutingModule
  ]
})
export class NewsAdminModule { }
