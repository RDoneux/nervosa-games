import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';
import { PostCarouselComponent } from 'src/app/components/post-carousel/post-carousel.component';
import { CommentSectionComponent } from 'src/app/components/comment-section/comment-section.component';
import { RichTextInputComponent } from 'src/app/components/rich-text-input/rich-text-input.component';

@NgModule({
  declarations: [PostComponent, LikeButtonComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    PostCarouselComponent,
    CommentSectionComponent,
    RichTextInputComponent
  ],
})
export class PostModule {}
