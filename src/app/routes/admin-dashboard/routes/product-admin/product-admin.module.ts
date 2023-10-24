import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAdminRoutingModule } from './product-admin-routing.module';
import { ProductAdminComponent } from './product-admin.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';
import { CreateComponentComponent } from './components/create-product/create-component.component';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { TagManagerComponent } from 'src/app/components/tag-manager/tag-manager.component';

@NgModule({
  declarations: [ProductAdminComponent, CreateComponentComponent],
  imports: [
    CommonModule,
    ProductAdminRoutingModule,
    FormsModule,
    UserInterfaceModule,
    FileUploadComponent,
    TagManagerComponent
  ],
})
export class ProductAdminModule {}
