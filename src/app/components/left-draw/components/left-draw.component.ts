import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TDrawLocation } from '../types/t-draw-location.type';

@Component({
  selector: 'app-left-draw',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-draw.component.html',
  styleUrls: ['./left-draw.component.scss'],
})
export class LeftDrawComponent {
  @Input({ required: true }) show!: boolean;
  @Input() location: TDrawLocation = 'left';
}
