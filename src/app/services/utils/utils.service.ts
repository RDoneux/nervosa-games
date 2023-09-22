import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /* istanbul ignore next */
  public isDevMode(): boolean { // not strictly required, but makes testing much easier!
    return isDevMode();
  }
}
