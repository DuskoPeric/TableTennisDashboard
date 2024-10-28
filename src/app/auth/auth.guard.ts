import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isAuth = this.authService.user();
    if (isAuth) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
