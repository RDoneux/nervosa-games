import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTestersComponent } from './play-testers.component';
import { AboutUsModule } from '../../about-us.module';

describe('PlayTestersComponent', () => {
  let component: PlayTestersComponent;
  let fixture: ComponentFixture<PlayTestersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayTestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
