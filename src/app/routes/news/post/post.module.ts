import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';

@NgModule({
  declarations: [PostComponent, LikeButtonComponent],
  imports: [CommonModule, PostRoutingModule],
})
export class PostModule {}
