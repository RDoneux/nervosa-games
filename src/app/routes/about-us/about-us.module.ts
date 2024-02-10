import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { TitleTextComponent } from './components/title-text/title-text.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ContactUsComponent } from 'src/app/components/contact-us/contact-us.component';
import { FooterComponent } from 'src/app/components/footer/components/footer/footer.component';
import { FooterTextComponent } from './components/footer-text/footer-text.component';

@NgModule({
  declarations: [
    AboutUsComponent,
    TitleTextComponent,
    CollaboratorsComponent,
    CollaboratorComponent,
    FooterTextComponent,
  ],
  imports: [CommonModule, AboutUsRoutingModule, ContactUsComponent],
})
export class AboutUsModule {}
