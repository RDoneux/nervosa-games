import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIconComponent } from './home-icon.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeIconComponent', () => {
  let component: HomeIconComponent;
  let fixture: ComponentFixture<HomeIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeIconComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(HomeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
