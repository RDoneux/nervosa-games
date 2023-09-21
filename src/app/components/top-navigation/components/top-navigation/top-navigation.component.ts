import { Component } from '@angular/core';
import { INavigationRoute } from '../../interfaces/i-navigation-route.interface';
import { nervosaGamesSiteRoutes } from '../../data/navigation-routes.data';
import { ISocialMediaIconLink } from '../../interfaces/i-social-media-icon-link.interface';
import { socialMediaIcons } from '../../data/social-media-icons.data';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent {
  public routes: INavigationRoute[] = nervosaGamesSiteRoutes;
  public socialMediaIcons: ISocialMediaIconLink[] = socialMediaIcons;
}
