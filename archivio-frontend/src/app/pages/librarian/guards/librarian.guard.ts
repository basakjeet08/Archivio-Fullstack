import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Roles } from 'src/app/shared/Models/Roles';
import { AuthService } from 'src/app/shared/services/auth.service';

export const librarianGuard: CanActivateFn = (_route, _state) => {
  // Injecting the required dependency
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // Checking if the current user is Librarian or not
  if (authService.getUserRole() === Roles.LIBRARIAN) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
