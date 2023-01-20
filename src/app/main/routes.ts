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
        }
      },
      {
        path: 'place/:key',
        loadChildren: () => import('./place/index').then(m => m.PlaceModule),
        resolve: {
          item: PlaceResolver
        }
      },
      {
        path: 'scan',
        loadChildren: () => import('./scan/index').then(m => m.ScanModule),
      },
      {
        path: 'card',
        loadChildren: () => import('./card/index').then(m => m.CardModule),
      },
      {
        path: 'cookies',
        loadChildren: () => import('./cookies/index').then(m => m.CookiesModule),
      },
      {
        path: 'privacy',
        loadChildren: () => import('./privacy/index').then(m => m.PrivacyModule),
      },
      {
        path: 'terms',
        loadChildren: () => import('./terms/index').then(m => m.TermsModule),
      }
    ]
  }
];

export const MODULE_COMPONENTS = [
  MainComponent
];
