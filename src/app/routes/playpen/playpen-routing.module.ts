import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaypenComponent } from './playpen.component';

const routes: Routes = [{ path: '', component: PlaypenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaypenRoutingModule { }
