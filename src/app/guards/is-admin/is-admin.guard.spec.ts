import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';

import { isAdminGuard } from './is-admin.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/services/login/login.service';
import { Observable, of } from 'rxjs';
import { fakeRouterState, mockedUser } from 'src/app/data/test-data';

describe('isAdminGuard', () => {
  let loginServiceMock: {getCurrentLoggedInUser: jest.Mock}
  let router: Router;

  const dummyRoute = {} as ActivatedRouteSnapshot;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isAdminGuard(...guardParameters));

  beforeEach(() => {
    loginServiceMock = {
      'getCurrentLoggedInUser': jest.fn()
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: LoginService, useValue: loginServiceMock }],
    });
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('#isAdminGuard', () => {
    it('should resolve true if user is admin', async () => {
      let mockedUserWhoIsAdmin = mockedUser;
      mockedUserWhoIsAdmin.isAdmin = true;

      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(
        of(mockedUserWhoIsAdmin)
      );
      const result = await executeGuard(dummyRoute, fakeRouterState(''));

      expect(result).toBeTruthy();
    });

    it('should redirect to unauthorised if user is not defined', async () => {
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(of(null));
      jest.spyOn(router, 'navigate').mockImplementation();

      await executeGuard(dummyRoute, fakeRouterState(''));
      expect(router.navigate).toHaveBeenCalledWith(['/unauthorised']);
    });

    it('should redirect to unauthorised if user is not admin', async () => {
      let mockedUserWhoIsNotAdmin = mockedUser;
      mockedUserWhoIsNotAdmin.isAdmin = false;
      loginServiceMock.getCurrentLoggedInUser.mockReturnValue(
        of(mockedUserWhoIsNotAdmin)
      );
      jest.spyOn(router, 'navigate').mockImplementation();

      await executeGuard(dummyRoute, fakeRouterState(''));

      expect(router.navigate).toHaveBeenCalledWith(['/unauthorised']);
    });
  });
});
