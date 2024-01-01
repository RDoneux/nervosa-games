import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationContainerComponent } from './notification-container.component';
import { NotificationModule } from '../../notification.module';

describe('NotificationContainerComponent', () => {
  let component: NotificationContainerComponent;
  let fixture: ComponentFixture<NotificationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
