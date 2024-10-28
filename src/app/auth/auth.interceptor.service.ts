import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';

import { AuthService } from './auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const user = inject(AuthService).user;
  if(!user()){
    return next(req);
  }
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${user()?.token}`),
  });
  return next(newReq);
}

