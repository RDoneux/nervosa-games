import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsAdminRoutingModule } from './news-admin-routing.module';
import { NewsAdminComponent } from './news-admin.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewsAdminComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    NewsAdminRoutingModule,
    UserInterfaceModule,
    FormsModule
  ]
})
export class NewsAdminModule { }
