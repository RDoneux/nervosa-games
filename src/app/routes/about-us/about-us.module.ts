import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { TitleTextComponent } from './components/title-text/title-text.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ContactUsComponent } from 'src/app/components/contact-us/contact-us.component';
import { FooterTextComponent } from './components/footer-text/footer-text.component';
import { PlayTestersComponent } from './components/play-testers/play-testers.component';

@NgModule({
  declarations: [
    AboutUsComponent,
    TitleTextComponent,
    CollaboratorsComponent,
    CollaboratorComponent,
    FooterTextComponent,
    PlayTestersComponent,
  ],
  imports: [CommonModule, AboutUsRoutingModule, ContactUsComponent],
})
export class AboutUsModule {}
