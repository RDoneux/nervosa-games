import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private sessionId!: string;
  private keyPrefix: string = 'NG';

  constructor() {
    const previousSessionId: string | null = localStorage.getItem(`${this.keyPrefix}:session-id`);
    this.sessionId = previousSessionId
      ? previousSessionId
      : crypto.randomUUID();
    localStorage.setItem(`${this.keyPrefix}:session-id`, this.sessionId)
  }

  public save(key: string, payload: string) {
    localStorage.setItem(
      `${this.keyPrefix}|${this.sessionId}|${key}`,
      payload
    );
  }

  public get(key: string): string | null {
    return localStorage.getItem(`${this.keyPrefix}|${this.sessionId}|${key}`);
  }
}
