import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { canActivateInDevModeGuard } from './can-activate-in-dev-mode.guard';
import { UtilsService } from '../../services/utils/utils.service';
import { RouterTestingModule } from '@angular/router/testing';
import { fakeRouterState } from 'src/app/data/test-data';

describe('canActivateInDevModeGuard', () => {
  let isInDevMode: boolean = false;
  let utilsServiceMock: any = { isDevMode: () => isInDevMode };
  let router: Router;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      canActivateInDevModeGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: UtilsService, useValue: utilsServiceMock }],
    });
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('#canActivateInDevMode', () => {
    it('should return true if in dev mode', () => {
      isInDevMode = true;
      expect(executeGuard(dummyRoute, fakeRouterState(''))).toBeTruthy();
    });
    it('should redirect to unauthorised if in not in dev mode', () => {
      isInDevMode = false;
      jest.spyOn(router, 'navigate').mockImplementation();
      executeGuard(dummyRoute, fakeRouterState(''));
      expect(router.navigate).toHaveBeenCalledWith(['/unauthorised']);
    });
  });
});
