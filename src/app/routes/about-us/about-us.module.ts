import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { TitleTextComponent } from './components/title-text/title-text.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';

@NgModule({
  declarations: [AboutUsComponent, TitleTextComponent, CollaboratorsComponent],
  imports: [CommonModule, AboutUsRoutingModule],
})
export class AboutUsModule {}
