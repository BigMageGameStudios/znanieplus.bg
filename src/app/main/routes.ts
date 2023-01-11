import { Route } from '@angular/router';
import { MainComponent } from './component';
import { HomeResolver, ApartmentResolver } from './resolvers';

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
        loadChildren: () => import('./apartment/index').then(m => m.ApartmentModule),
        resolve: {
          apartment: ApartmentResolver
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
