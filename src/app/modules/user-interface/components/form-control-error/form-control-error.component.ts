import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { IFormControlError } from '../../interfaces/i-form-control-error.interface';
import { defaultFormControlError } from '../../data/d-form-control-error.data';
import {unionBy} from 'lodash-es';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormControlErrorComponent implements OnInit, AfterViewInit {
  @Input() ngModel!: NgModel | undefined;
  @Input() errors!: IFormControlError[];

  public defaultErrorList: IFormControlError[] = defaultFormControlError;
  public error!: string;

  ngOnInit(): void {
    this.errors = unionBy(this.errors, this.defaultErrorList, 'error');
  }

  ngAfterViewInit(): void {
    this.ngModel?.valueChanges?.subscribe({
      next: () => this.updateError(),
    });
  }

  updateError(): void {
    this.error =
      this.errors.find((error: IFormControlError) =>
        this.ngModel?.hasError(error.error)
      )?.message ?? '';
  }
}
