import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavigationRoute } from '../../interfaces/i-navigation-route.interface';

@Component({
  selector: 'app-navigation-links-desktop',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation-links-desktop.component.html',
  styleUrls: ['./navigation-links-desktop.component.scss']
})
export class NavigationLinksDesktopComponent {

  @Input({required: true}) routes!: INavigationRoute[];

}
