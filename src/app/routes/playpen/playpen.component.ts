import { Component } from '@angular/core';

@Component({
  selector: 'app-playpen',
  templateUrl: './playpen.component.html',
  styleUrls: ['./playpen.component.scss'],
})
export class PlaypenComponent {
  public testValues = {
    text: '',
    dropdown: '',
    checkbox: '',
    radio: '',
    radioGroup: '',
    checkboxGroup: {
      one: false,
      two: false,
      three: false,
      four: false,
    },
    textArea: ''
  };
}
