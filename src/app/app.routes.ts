import { Route } from '@angular/router';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('./main/module').then(m => m.MainModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/module').then(m => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const MODULE_COMPONENTS = [];
