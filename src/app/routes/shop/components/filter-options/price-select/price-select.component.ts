import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { IPriceRange } from '../../../interfaces/i-price-range.interface';

@Component({
  selector: 'app-price-select',
  templateUrl: './price-select.component.html',
  styleUrls: ['./price-select.component.scss'],
})
export class PriceSelectComponent implements OnInit {
  @Input() priceRange!: IPriceRange;

  @Output() update: EventEmitter<IPriceRange> = new EventEmitter();

  public updateNotifier: Subject<null> = new Subject();

  ngOnInit(): void {
    this.updateNotifier
      .pipe(debounceTime(500))
      .subscribe(() => this.onModelChange());
  }

  updateMinValue(): void {
    if (this.priceRange.min > this.priceRange.max)
      this.priceRange.min = this.priceRange.max;
    this.updateNotifier.next(null);
  }

  updateMaxValue(): void {
    if (this.priceRange.max < this.priceRange.min)
      this.priceRange.max = this.priceRange.min;
    this.updateNotifier.next(null);
  }

  onModelChange(): void {
    this.update.emit({ min: this.priceRange.min, max: this.priceRange.max });
  }
}
