import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { AuthServiceService } from './auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(AuthServiceService);
  const router = inject(Router);

  if (apiService.isLoggedIn()) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false;
  }
};
