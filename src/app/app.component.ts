import { Component, OnInit } from '@angular/core';
import { debugInit } from './services/debug/debug';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    debugInit();
  }
}
