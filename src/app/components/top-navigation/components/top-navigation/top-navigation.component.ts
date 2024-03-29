import { Component, OnInit } from '@angular/core';
import { INavigationRoute } from '../../interfaces/i-navigation-route.interface';
import { nervosaGamesSiteRoutes } from '../../../../data/navigation-routes.data';
import { ISocialMediaIconLink } from '../../interfaces/i-social-media-icon-link.interface';
import { socialMediaIcons } from '../../../../data/social-media-icons.data';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IGeneralSettings } from 'src/app/interfaces/i-general-settings.interface';
import { debug } from 'src/app/services/debug/debug';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {
  public routes: INavigationRoute[] = nervosaGamesSiteRoutes;
  public socialMediaIcons: ISocialMediaIconLink[] = socialMediaIcons;
  public settings: IGeneralSettings | undefined;
  public url!: string;

  constructor(
    private firestoreService: FirestoreService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.route.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => (this.url = event.url.substring(1)));

    this.firestoreService
      .getFirestore()
      .collection('general')
      .doc<IGeneralSettings>('settings')
      .valueChanges()
      .subscribe({
        next: (settings: IGeneralSettings | undefined) =>
          (this.settings = settings),
        error: (error: any) => debug('error')(error),
      });
  }
}
