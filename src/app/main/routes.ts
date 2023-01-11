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
          apartment: PlaceResolver
        }
      },
      {
        path: 'card',
        loadChildren: () => import('./card/index').then(m => m.CardModule),
      }
    ]
  }
];

export const MODULE_COMPONENTS = [
  MainComponent
];
