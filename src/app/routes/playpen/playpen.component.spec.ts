import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaypenComponent } from './playpen.component';

describe('PlaypenComponent', () => {
  let component: PlaypenComponent;
  let fixture: ComponentFixture<PlaypenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaypenComponent]
    });
    fixture = TestBed.createComponent(PlaypenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
