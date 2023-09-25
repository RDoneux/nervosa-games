import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaypenRoutingModule } from './playpen-routing.module';
import { PlaypenComponent } from './playpen.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlaypenComponent],
  imports: [
    CommonModule,
    PlaypenRoutingModule,
    UserInterfaceModule,
    FormsModule,
  ],
})
export class PlaypenModule {}
