import { Component, OnInit } from '@angular/core';
import { debugInit } from './services/debug/debug';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeInOutRoute } from './animations/fade-in-put-route.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOutRoute]
})
export class AppComponent implements OnInit {

  constructor(private contexts: ChildrenOutletContexts) {}

  /* istanbul ignore next */
  ngOnInit(): void {
    debugInit();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
