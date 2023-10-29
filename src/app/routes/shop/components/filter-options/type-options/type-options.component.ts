import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TProduct } from '../../../types/t-product.type';

@Component({
  selector: 'app-type-options',
  templateUrl: './type-options.component.html',
  styleUrls: ['./type-options.component.scss'],
})
export class TypeOptionsComponent {
  @Input() public typeArray: TProduct[] = [
    'minature',
    'scenery',
    'supporting_material',
  ];

  @Output() update: EventEmitter<TProduct[]> = new EventEmitter();

  public minature: TProduct = 'minature';
  public scenery: TProduct = 'scenery';
  public supportingMaterial: TProduct = 'supporting_material';

  onChange(type: TProduct): void {
    if (this.typeArray.includes(type)) {
      this.typeArray = this.typeArray.filter(
        (value: TProduct) => value !== type
      );
    } else {
      this.typeArray.push(type);
    }
    this.update.emit(this.typeArray);
  }
}
