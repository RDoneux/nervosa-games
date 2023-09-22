import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorisedComponent } from './not-authorised.component';

const routes: Routes = [{ path: '', component: NotAuthorisedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotAuthorisedRoutingModule { }
