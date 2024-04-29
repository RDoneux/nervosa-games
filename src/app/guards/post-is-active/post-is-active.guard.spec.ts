import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { postIsActiveGuard } from './post-is-active.guard';

describe('postIsActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => postIsActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
