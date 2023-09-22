import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilsService } from '../services/utils/utils.service';

export const canActivateInDevModeGuard: CanActivateFn = () => {
  const inDevMode: boolean = inject(UtilsService).isDevMode();
  const router: Router = inject(Router);
  return inDevMode ? true : router.navigate(['/unauthorised']);
};
