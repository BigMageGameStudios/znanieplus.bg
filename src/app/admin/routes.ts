import { Route } from '@angular/router';
import { AdminComponent } from './component';
import { AuthGuardProvider } from './guards/AuthGuardProvider';
import { NotAuthGuardProvider } from './guards/NotAuthGuardProvider';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/index').then(m => m.MainAdminModule),
        canActivate: [AuthGuardProvider]
      },
      {
        path: 'login',
        loadChildren: () => import('./login/index').then(m => m.LoginModule),
        canActivate: [NotAuthGuardProvider]
      },
      {
        path: 'forgotten-password',
        loadChildren: () => import('./forgotten-password/index').then(m => m.ForgottenPasswordModule),
        canActivate: [NotAuthGuardProvider]
      },
      {
        path: 'reset-password/:token',
        loadChildren: () => import('./reset-password/index').then(m => m.ResetPasswordModule),
        canActivate: [NotAuthGuardProvider]
      },
    ]
  }
];

export const MODULE_COMPONENTS = [
  AdminComponent
];
