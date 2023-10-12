import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginOptionsComponent } from './components/login-options/login-options.component';
import { ModalComponent } from '../modal/modal.component';
import { LoginOptionsContentComponent } from './components/login-options-content/login-options-content.component';



@NgModule({
  declarations: [
    LoginOptionsComponent,
    LoginOptionsContentComponent
  ],
  imports: [
    CommonModule, ModalComponent
  ],
  exports: [LoginOptionsComponent]
})
export class LoginOptionsModule { }
