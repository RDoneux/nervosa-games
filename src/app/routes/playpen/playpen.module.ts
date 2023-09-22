import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaypenRoutingModule } from './playpen-routing.module';
import { PlaypenComponent } from './playpen.component';

@NgModule({
  declarations: [PlaypenComponent],
  imports: [CommonModule, PlaypenRoutingModule],
})
export class PlaypenModule {}
