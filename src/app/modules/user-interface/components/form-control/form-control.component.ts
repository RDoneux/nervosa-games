import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { debug } from 'src/app/services/debug/debug';
import { IFormControlError } from '../../interfaces/i-form-control-error.interface';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormControlComponent implements AfterViewInit {
  @Input() label!: string;
  @Input() errors!: IFormControlError[];

  @ViewChild('container')
  private _formControlContainer!: ElementRef<HTMLDivElement>;
  public get formControlContainer(): HTMLDivElement {
    return this._formControlContainer.nativeElement;
  }

  @ContentChild(NgModel) ngModel: NgModel | undefined;

  private inputElement!: HTMLInputElement | HTMLSelectElement;

  public hasContent!: boolean;

  ngAfterViewInit(): void {
    this.validateComponent();

    this.inputElement = this.formControlContainer.children[0] as
      | HTMLInputElement
      | HTMLSelectElement;

    this.inputElement.classList.add('nerv-g-form-control-input');

    this.ngModel?.valueChanges?.subscribe({
      next: (newValue: string) => this.handleValueChange(newValue),
    });
  }

  handleValueChange(newValue: string): void {
    this.hasContent = newValue.length > 0 ? true : false;
  }

  validateComponent(): void {
    if (!this.ngModel)
      debug('error')(
        'Form Control Input must be provided with an ngModel value'
      );
  }
}
