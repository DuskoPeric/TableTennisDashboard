import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate:[AuthGuard]
  },
];
