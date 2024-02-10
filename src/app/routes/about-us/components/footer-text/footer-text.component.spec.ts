import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTextComponent } from './footer-text.component';

describe('FooterTextComponent', () => {
  let component: FooterTextComponent;
  let fixture: ComponentFixture<FooterTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
