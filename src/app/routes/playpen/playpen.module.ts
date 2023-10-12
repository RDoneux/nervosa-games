import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaypenRoutingModule } from './playpen-routing.module';
import { PlaypenComponent } from './playpen.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';
import { AnnouncmentPostComponent } from 'src/app/components/announcment-post/components/announcment-post.component';
import { PostCarouselComponent } from 'src/app/components/post-carousel/post-carousel.component';

@NgModule({
  declarations: [PlaypenComponent],
  imports: [
    CommonModule,
    PlaypenRoutingModule,
    UserInterfaceModule,
    FormsModule,
    AnnouncmentPostComponent,
  ],
})
export class PlaypenModule {}
