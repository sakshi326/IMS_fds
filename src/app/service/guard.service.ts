import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresAdmin = route.data['requiresAdmin'] || false;

    // Check if user is authenticated
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    // Role-based navigation
    const role = this.apiService.getRole();
    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiresAdmin && role !== 'MANAGER') {
      // If admin access is required but user is not an admin
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    // Navigate based on role
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'manager') {
      this.router.navigate(['/manager-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }

    return true;
  }
}
