import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { AnnouncmentPostComponent } from 'src/app/components/announcment-post/components/announcment-post.component';


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    AnnouncmentPostComponent
  ]
})
export class NewsModule { }
