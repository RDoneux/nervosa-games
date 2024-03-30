import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTextComponent } from './footer-text.component';
import { AboutUsModule } from '../../about-us.module';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { getFirestoreStub } from 'src/app/services/firestore/firestore-testing';
import { RecaptchaService } from 'src/app/services/recaptcha/recaptcha.service';

describe('FooterTextComponent', () => {
  let component: FooterTextComponent;
  let fixture: ComponentFixture<FooterTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsModule],
      providers: [
        { provide: FirestoreService, useValue: getFirestoreStub('') },
        { provide: RecaptchaService, useValue: {}}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
