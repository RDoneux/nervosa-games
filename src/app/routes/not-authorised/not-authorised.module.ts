import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotAuthorisedRoutingModule } from './not-authorised-routing.module';
import { NotAuthorisedComponent } from './not-authorised.component';


@NgModule({
  declarations: [
    NotAuthorisedComponent
  ],
  imports: [
    CommonModule,
    NotAuthorisedRoutingModule
  ]
})
export class NotAuthorisedModule { }
