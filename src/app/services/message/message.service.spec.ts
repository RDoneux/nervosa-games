import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { filter } from 'rxjs';
import { ISystemMessage } from './i-system-message';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send message', () => {
    service.listen$().subscribe({
      next: (value: string) => {
        expect(value).toBeDefined();
      },
    });
    service.send({ stream: 'test', payload: 'test', sender: 'test' });
  });
  it('should send message on specified stream', () => {
    service
      .listen$()
      .pipe(filter((a) => a.stream === 'testStream'))
      .subscribe({
        next: (value: string) => {
          expect(value).toBeDefined();
        },
      });
    service.send({ stream: 'testStream', payload: 'test', sender: 'test' });
  });
  describe('#getStreams$', () => {
    it('should recieve a message on requested stream', () => {
      service.getStreams$(['specifiedStream']).subscribe({
        next: (value: ISystemMessage) => {
          expect(value.payload).toBe("testStreamSpecificMessage")
        }
      })
      service.send({stream: 'specifiedStream', payload: 'testStreamSpecificMessage', sender: ''})
    })
  })
});
