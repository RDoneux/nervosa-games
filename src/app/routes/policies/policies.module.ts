import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PoliciesComponent
  ],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    RouterModule
  ]
})
export class PoliciesModule { }
