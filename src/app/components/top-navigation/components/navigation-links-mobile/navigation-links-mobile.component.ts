import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { INavigationRoute } from '../../interfaces/i-navigation-route.interface';

@Component({
  selector: 'app-navigation-links-mobile',
  templateUrl: './navigation-links-mobile.component.html',
  styleUrls: ['./navigation-links-mobile.component.scss'],
})
export class NavigationLinksMobileComponent {
  @Input({ required: true }) routes!: INavigationRoute[];

  public showMenu: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('window:click', ['$event'])
  public menuClosed(event: MouseEvent) {
    if (this.getElement().contains(event.target)) return;
    this.showMenu = false;
  }

  public getElement(): any {
    return this.elementRef.nativeElement;
  }
}
