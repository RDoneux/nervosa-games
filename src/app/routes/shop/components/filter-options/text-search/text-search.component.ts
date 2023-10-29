import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Subject,
  debounceTime,
  filter,
  isEmpty,
  skipWhile,
  take,
  takeLast,
} from 'rxjs';

@Component({
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.scss'],
})
export class TextSearchComponent implements OnInit {
  @Input() value: string = '';

  @Output() update: EventEmitter<string> = new EventEmitter();

  public updateNotifier: Subject<string> = new Subject();

  ngOnInit(): void {
    this.updateNotifier
      .pipe(debounceTime(500))
      .subscribe((update) => this.onChange(update));
  }

  private onChange(value: string) {
    this.update.emit(value.toLowerCase());
  }
}
