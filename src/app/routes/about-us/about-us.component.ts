import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IAboutUsText } from './interfaces/I-about-us-text';
import { IAboutUsCollaborators } from './interfaces/i-about-us-collaborators';
import { IAboutUsData } from './interfaces/i-about-us-data';
import { IAboutUsPlayTesters } from './interfaces/i-about-us-play-testers';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  text!: IAboutUsText;
  collaborators!: IAboutUsCollaborators;
  playTesters!: IAboutUsPlayTesters;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collectionGroup<IAboutUsData>('about-us')
      .valueChanges()
      .subscribe({
        next: (response) => this.processResponse(response),
      });
  }

  processResponse(response: IAboutUsData[]): void {
    response.forEach((data) => {
      switch (data.identifier) {
        case 'text':
          this.text = data as IAboutUsText;
          break;
        case 'play testers':
          this.playTesters = data as IAboutUsPlayTesters;
          break;
        case 'collaborators':
          this.collaborators = data as IAboutUsCollaborators;
          break;
      }
    });
  }
}
