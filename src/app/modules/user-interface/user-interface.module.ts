import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';

@NgModule({
  declarations: [FormControlComponent, FormControlErrorComponent],
  imports: [CommonModule],
  exports: [FormControlComponent],
})
export class UserInterfaceModule {}
