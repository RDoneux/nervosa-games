import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
})
export class QuantitySelectorComponent {
  public value: number = 1;

  @Output() valueChanged: EventEmitter<number> = new EventEmitter();

  onAdd() {
    this.value++;
    this.valueChanged.emit(this.value);
  }
  onRemove() {
    if (this.value === 0) return;
    this.value--;
    this.valueChanged.emit(this.value);
  }
}
