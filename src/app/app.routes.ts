import { Route } from '@angular/router';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('./main/module').then(m => m.MainModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./error').then(m => m.ErrorPageModule),
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const MODULE_COMPONENTS = [];
