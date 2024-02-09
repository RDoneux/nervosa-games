import { Component, Input } from '@angular/core';
import { IAboutUsCollaborators } from '../../interfaces/i-about-us-collaborators';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.scss'
})
export class CollaboratorsComponent {
  @Input({required: true}) collaborators!: IAboutUsCollaborators;
}
