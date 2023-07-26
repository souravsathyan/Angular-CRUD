import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  console.log(token);
  if (token) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

export const noToLogin: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  console.log(token);
  if (token) {
    router.navigate(['']);
    return false;
  } else {
    return true;
  }
};
