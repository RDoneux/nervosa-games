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
  };
}
