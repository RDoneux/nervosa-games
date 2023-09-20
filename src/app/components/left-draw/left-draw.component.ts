import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-draw',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-draw.component.html',
  styleUrls: ['./left-draw.component.scss'],
})
export class LeftDrawComponent {
  @Input({ required: true }) show!: boolean;
}
