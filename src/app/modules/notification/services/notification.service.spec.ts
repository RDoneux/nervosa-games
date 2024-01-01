import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { INotification, NotificationType } from '../interfaces/i-notification';
import { take } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#showNotification', () => {
    it('should add notification to notification array', () => {
      service.globalNotifications$.subscribe((res: INotification[]) => {
        expect(res[0].title).toEqual('test-title');
        expect(res[0].type).toEqual(NotificationType.SUCCESS);
        expect(res[0].timer).toEqual(1);
        expect(res[0].id).toBeDefined();
      });

      service.showNotification('test-title', NotificationType.SUCCESS, 1);
    });

    it('should add notification to notification array using custom id', () => {
      service.globalNotifications$.subscribe((res: INotification[]) => {
        expect(res[0].title).toEqual('test-title');
        expect(res[0].type).toEqual(NotificationType.SUCCESS);
        expect(res[0].timer).toEqual(1);
        expect(res[0].id).toEqual('test-id');
      });

      service.showNotification(
        'test-title',
        NotificationType.SUCCESS,
        1,
        'test-id'
      );
    });
  });

  describe('#removeNotification', () => {
    it('should remove the target notification', () => {
      service.globalNotifications$
        .pipe(take(1))
        .subscribe((res: INotification[]) => {
          expect(res[0].title).toEqual('test-title');
          expect(res[0].type).toEqual(NotificationType.SUCCESS);
          expect(res[0].timer).toEqual(1);
          expect(res[0].id).toEqual('test-id');
        });

      service.showNotification(
        'test-title',
        NotificationType.SUCCESS,
        1,
        'test-id'
      );

      service.globalNotifications$
        .pipe(take(1))
        .subscribe((res: INotification[]) => {
          expect(res.length).toBe(0);
        });

      service.removeNotification('test-id');
    });
  });
});
