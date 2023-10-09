import { Injectable } from '@angular/core';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private sessionId!: string;
  private keyPrefix: string = 'NG';

  constructor() {
    const previousSessionId: string | null = sessionStorage.getItem(
      `${this.keyPrefix}:session-id`
    );
    this.sessionId = previousSessionId ? previousSessionId : v4();
    sessionStorage.setItem(`${this.keyPrefix}:session-id`, this.sessionId);
  }

  public save(key: string, payload: string) {
    sessionStorage.setItem(
      `${this.keyPrefix}|${this.sessionId}|${key}`,
      payload
    );
  }

  public get(key: string): string | null {
    return sessionStorage.getItem(`${this.keyPrefix}|${this.sessionId}|${key}`);
  }
}
