import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { LoginService } from 'src/app/services/login/login.service';

export const isAdminGuard: CanActivateFn = () => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);
  return new Promise((resolve) => {
    loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => {
        resolve(user ? user.isAdmin : router.navigate(['/unauthorised']));
      },
    });
  });
};
