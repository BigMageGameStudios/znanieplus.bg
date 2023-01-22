import { Route } from '@angular/router';
import { MainComponent } from './component';
import { HomeResolver, PlaceResolver } from './resolvers';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/index').then(m => m.HomeModule),
        resolve: {
          result: HomeResolver
        },
        data: {
          preload: true
        },
      },
      {
        path: 'place/:key',
        loadChildren: () => import('./place/index').then(m => m.PlaceModule),
        resolve: {
          item: PlaceResolver
        },
        data: {
          preload: true
        },
      },
      {
        path: 'scan',
        loadChildren: () => import('./scan/index').then(m => m.ScanModule),
        data: {
          preload: true
        },
      },
      {
        path: 'card',
        loadChildren: () => import('./card/index').then(m => m.CardModule),
        data: {
          preload: true
        },
      },
      {
        path: 'cookies',
        loadChildren: () => import('./cookies/index').then(m => m.CookiesModule),
        data: {
          preload: true
        },
      },
      {
        path: 'privacy',
        loadChildren: () => import('./privacy/index').then(m => m.PrivacyModule),
        data: {
          preload: true
        },
      },
      {
        path: 'terms',
        loadChildren: () => import('./terms/index').then(m => m.TermsModule),
        data: {
          preload: true
        },
      }
    ]
  }
];

export const MODULE_COMPONENTS = [
  MainComponent
];
