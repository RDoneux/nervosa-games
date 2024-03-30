import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopNavigationComponent } from './top-navigation.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LeftDrawComponent } from 'src/app/components/left-draw/components/left-draw.component';
import { CartModule } from 'src/app/modules/cart/cart.module';
import { TopNavigationModule } from '../../top-navigation.module';

describe('TopNavigationComponent', () => {
  let component: TopNavigationComponent;
  let fixture: ComponentFixture<TopNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, LeftDrawComponent, RouterTestingModule, CartModule, TopNavigationModule],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    fixture = TestBed.createComponent(TopNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
