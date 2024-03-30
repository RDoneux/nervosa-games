import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationContainerComponent } from './notification-container.component';
import { NotificationModule } from '../../notification.module';
import { NotificationService } from '../../services/notification.service';
import { Observable, of } from 'rxjs';
import { NotificationType } from '../../interfaces/i-notification';

describe('NotificationContainerComponent', () => {
  let component: NotificationContainerComponent;
  let fixture: ComponentFixture<NotificationContainerComponent>;

  let notificationServiceMock: {globalNotifications$: Observable<any>}

  beforeEach(async () => {
    notificationServiceMock =  {
      globalNotifications$: of([
        {
          title: 'test-title',
          type: NotificationType.SUCCESS,
        },
      ]),
    };
    await TestBed.configureTestingModule({
      imports: [NotificationModule],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set global notifications equal to service subscription', () => {
      component.ngOnInit();

      expect(component.globalNotifications[0].title).toEqual('test-title');
      expect(component.globalNotifications[0].type).toEqual(
        NotificationType.SUCCESS
      );
    });
  });
});
