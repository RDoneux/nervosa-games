import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-text',
  templateUrl: './footer-text.component.html',
  styleUrl: './footer-text.component.scss'
})
export class FooterTextComponent {
  @Input({required: true}) text!: string;
}
