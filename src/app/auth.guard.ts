import { forwardRef, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from './services/users.service';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(forwardRef(()=> LoginService));
  const router = inject(forwardRef(()=> Router));

  if(authService.checkConnexion()){
    return true;
  }else{
    router.navigate(['/home'])
    return false;
  }


};
