import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTextComponent } from './title-text.component';
import { AboutUsModule } from '../../about-us.module';

describe('TitleTextComponent', () => {
  let component: TitleTextComponent;
  let fixture: ComponentFixture<TitleTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
