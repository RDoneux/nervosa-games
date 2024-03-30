import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsComponent } from './collaborators.component';
import { AboutUsModule } from '../../about-us.module';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
