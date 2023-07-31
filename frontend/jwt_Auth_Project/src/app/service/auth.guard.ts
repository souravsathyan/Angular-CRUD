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

export const isAdminLoggedIn = (state:any)=>{
  const admin = localStorage.getItem('admin')
  if(admin === 'true'){
    return true
  }else{
    const router = inject(Router);
    router.navigate(['admin/login'])
    return false
  }
}
