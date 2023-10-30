import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';
import { CollapsableSectionComponent } from './components/collapsable-section/collapsable-section.component';

@NgModule({
  declarations: [
    FormControlComponent,
    FormControlErrorComponent,
    CollapsableSectionComponent,
  ],
  imports: [CommonModule],
  exports: [FormControlComponent, CollapsableSectionComponent],
})
export class UserInterfaceModule {}
