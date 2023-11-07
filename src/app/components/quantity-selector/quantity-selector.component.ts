import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
})
export class QuantitySelectorComponent {
  @Input() public value: number = 1;

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
