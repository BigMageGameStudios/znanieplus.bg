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
      // {
      //   path: 'sale',
      //   loadChildren: () => import('./sale/index').then(m => m.SaleModule),
      //   resolve: {
      //     apartments: SaleResolver
      //   }
      // },
      // {
      //   path: 'rent',
      //   loadChildren: () => import('./rent/index').then(m => m.RentModule),
      //   resolve: {
      //     apartments: RentResolver
      //   }
      // },
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
