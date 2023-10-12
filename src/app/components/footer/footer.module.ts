import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from '../modal/modal.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, ModalComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
