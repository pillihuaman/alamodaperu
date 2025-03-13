import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authenticationService = inject(AuthenticationRepository);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Ensure code runs only in the browser (avoiding SSR errors)
    if (!isPlatformBrowser(this.platformId)) {
      return true; // Allow SSR to proceed without blocking routes
    }

    const currentUser = this.authenticationService.getCurrentUserValue;
    const snapshot = route.routeConfig?.path;

    if (currentUser) {
      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');

      if (token && helper.isTokenExpired(token)) {
        this.authenticationService.clearUser();
        console.error('Token expired. Redirecting to login.');
        this.router.navigate(['/auth/login']);
        return false;
      } else if (snapshot === 'auth') {
        return false; // Block access to login page if user is already authenticated
      }
      return true;
    }

    console.error('User not authenticated. Redirecting to login.');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
