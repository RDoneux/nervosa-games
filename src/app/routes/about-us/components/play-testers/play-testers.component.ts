import { Component, Input } from '@angular/core';
import { IAboutUsPlayTesters } from '../../interfaces/i-about-us-play-testers';

@Component({
  selector: 'app-play-testers',
  templateUrl: './play-testers.component.html',
  styleUrl: './play-testers.component.scss',
})
export class PlayTestersComponent {
  @Input({ required: true }) playTesters!: IAboutUsPlayTesters;
}
