import { Component, EventEmitter, Input, Output } from '@angular/core';
import { games } from 'src/app/data/games.data';
import { IGame } from 'src/app/routes/games/interfaces/i-game.interface';

@Component({
  selector: 'app-game-select',
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.scss'],
})
export class GameSelectComponent {
  @Input() public optionSelected: string = '';

  @Output() update: EventEmitter<string> = new EventEmitter();

  public options: IGame[] = games;

  onChange(event: string): void {
    this.update.emit(event.toLowerCase());
  }
}
