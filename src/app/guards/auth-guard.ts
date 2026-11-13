import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth';

// Solo deje pasar al que tenga sesión
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()){
    return true; // si pasa
  }
  return router.createUrlTree(['/login']);

};

// Solo deje pasar a quien NO tiene una sesión ( para /login)
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()){
    return true; 
  }
  return router.createUrlTree(['/']);

};