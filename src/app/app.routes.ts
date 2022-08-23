import { Route } from '@angular/router';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('./main/module').then(m => m.MainModule),
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const MODULE_COMPONENTS = [];
