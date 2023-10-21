import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { IProduct } from '../../interfaces/i-product.interface';

@Component({
  selector: 'app-more-detail',
  templateUrl: './more-detail.component.html',
  styleUrls: ['./more-detail.component.scss'],
})
export class MoreDetailComponent {
  @Input({required: true}) product!: IProduct;

  @Output() closeRequested: EventEmitter<null> = new EventEmitter();

  public moreDetailsComponent: Type<MoreDetailComponent> = MoreDetailComponent;

  onCloseRequested(): void {
    this.closeRequested.emit();
  }
}
