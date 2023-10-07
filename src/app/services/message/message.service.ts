import { Injectable } from '@angular/core';
import {
  Connectable,
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  from,
  scan,
  switchMap,
} from 'rxjs';
import { ISystemMessage } from './i-system-message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseSubject: Subject<any> = new Subject();
  private targetSubject = this.baseSubject.pipe(
    scan((acc, item: ISystemMessage) => ({ ...acc, [item.stream]: item }), {}),
    distinctUntilChanged()
  ) as Connectable<any>;

  public send(value: ISystemMessage): void {
    this.baseSubject.next(value);
  }

  public listen$(): Observable<any> {
    return this.targetSubject.pipe(
      switchMap((obj) => from(Object.values(obj)))
    ) as Observable<any>;
  }

  public getStreams$(filterName: string[]): Observable<ISystemMessage> {
    return this.targetSubject.pipe(
      switchMap((obj: ISystemMessage) => from(Object.values(obj))),
      filter((stream: ISystemMessage) => filterName.includes(stream.stream))
    );
  }
}
