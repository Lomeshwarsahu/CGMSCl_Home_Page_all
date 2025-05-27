import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { AuthServiceService } from './auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(AuthServiceService); // ✅ Inject services properly
  const router = inject(Router);

  if (apiService.isLoggedIn()) {
    return true; // ✅ Allow access
  } else {
    router.navigate(['/login']); // 🔴 Redirect if not authenticated
    return false;
  }
};
