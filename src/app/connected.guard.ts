import { forwardRef, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';

export const connectedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(forwardRef(() => LoginService));
  const router = inject(forwardRef(() => Router));

  if (authService.checkConnexion()) {
   router.navigate(['/accueil'])
    return false;
  } else {
    return true;
  }


};
