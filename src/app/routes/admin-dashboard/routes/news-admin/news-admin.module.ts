import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsAdminRoutingModule } from './news-admin-routing.module';
import { NewsAdminComponent } from './news-admin.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { RichTextInputComponent } from 'src/app/components/rich-text-input/rich-text-input.component';

@NgModule({
  declarations: [NewsAdminComponent, CreatePostComponent],
  imports: [
    CommonModule,
    NewsAdminRoutingModule,
    UserInterfaceModule,
    FormsModule,
    FileUploadComponent,
    RichTextInputComponent
  ],
})
export class NewsAdminModule {}
