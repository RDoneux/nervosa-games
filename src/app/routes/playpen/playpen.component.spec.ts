import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaypenComponent } from './playpen.component';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';

describe('PlaypenComponent', () => {
  let component: PlaypenComponent;
  let fixture: ComponentFixture<PlaypenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaypenComponent],
      imports: [UserInterfaceModule, FormsModule],
    });
    fixture = TestBed.createComponent(PlaypenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
