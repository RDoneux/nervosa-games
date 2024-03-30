import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorComponent } from './collaborator.component';
import { AboutUsModule } from '../../about-us.module';
import { TCollaboratorLevel } from '../../types/t-collaborator-level';

describe('CollaboratorComponent', () => {
  let component: CollaboratorComponent;
  let fixture: ComponentFixture<CollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorComponent);
    component = fixture.componentInstance;

    component.collaborator = {
      image: 'test-image',
      name: 'test-name',
      title: 'test-title',
      text: 'test-text',
      linkedIn: 'test-linked-in',
    };

    component.level = TCollaboratorLevel.PRIMARY

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
