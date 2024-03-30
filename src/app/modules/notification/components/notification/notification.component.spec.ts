import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationModule } from '../../notification.module';
import { NotificationType } from '../../interfaces/i-notification';
import { NotificationService } from '../../services/notification.service';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  let notificationServiceMock: {removeNotification: jest.Mock}

  beforeEach(async () => {
    notificationServiceMock = {
      'removeNotification': jest.fn()
    };
    await TestBed.configureTestingModule({
      imports: [NotificationModule],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;

    component.notification = {
      type: NotificationType.SUCCESS,
      title: 'test-title',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should do nothing if notification.timer is undefined', () => {
      component.notification.timer = undefined;

      component.ngOnInit();

      expect(component.timeLeft).toBeUndefined();
    });
    it('should set timeLeft to notification.timer', () => {
      component.notification.timer = 10;
      component.ngOnInit();

      expect(component.timeLeft).toEqual(10);
    });
    it('should call #onClose after given duration is passed', fakeAsync(() => {
      jest.spyOn(component, 'onClose').mockImplementation(() => {});
      component.notification.timer = 100;
      component.ngOnInit();

      expect(component.onClose).not.toHaveBeenCalled();

      tick(100);

      expect(component.onClose).toHaveBeenCalledTimes(1);
    }));
  });

  describe('#onClose', () => {
    it('should call notification service #removeNotification with own id', () => {
      component.notification.id = 'test-id';

      component.onClose();

      expect(
        notificationServiceMock.removeNotification
      ).toHaveBeenCalledWith('test-id');
    });
  });
});
