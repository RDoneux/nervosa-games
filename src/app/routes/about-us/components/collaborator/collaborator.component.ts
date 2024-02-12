import { Component, Input } from '@angular/core';
import { ICollaborator } from '../../interfaces/i-about-us-collaborators';
import { TCollaboratorLevel } from '../../types/t-collaborator-level';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrl: './collaborator.component.scss',
})
export class CollaboratorComponent {
  @Input({ required: true }) collaborator!: ICollaborator;
  @Input({required: true}) level!: TCollaboratorLevel;
}
