import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INavigationRoute } from '../../interfaces/i-navigation-route.interface';
import { LeftDrawComponent } from 'src/app/components/left-draw/left-draw.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  private menuClosed(event: MouseEvent) {
    if (this.elementRef.nativeElement.contains(event.target)) return;
    this.showMenu = false;
  }
}
