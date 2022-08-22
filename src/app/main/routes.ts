import { Route } from '@angular/router';
import { MainComponent } from './component';
import { HomeResolver, RentResolver, SaleResolver, ApartmentResolver } from './resolvers';

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
        path: 'sale',
        loadChildren: () => import('./sale/index').then(m => m.SaleModule),
        resolve: {
          apartments: SaleResolver
        }
      },
      {
        path: 'rent',
        loadChildren: () => import('./rent/index').then(m => m.RentModule),
        resolve: {
          apartments: RentResolver
        }
      },
      {
        path: 'apartment/:key',
        loadChildren: () => import('./apartment/index').then(m => m.ApartmentModule),
        resolve: {
          apartment: ApartmentResolver
        }
      }
    ]
  }
];

export const MODULE_COMPONENTS = [
  MainComponent
];
