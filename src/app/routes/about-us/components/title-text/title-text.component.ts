import { Component, Input } from '@angular/core';
import { IAboutUsText } from '../../interfaces/I-about-us-text';

@Component({
  selector: 'app-title-text',
  templateUrl: './title-text.component.html',
  styleUrl: './title-text.component.scss',
})
export class TitleTextComponent {
  @Input({ required: true }) text!: IAboutUsText;
}
