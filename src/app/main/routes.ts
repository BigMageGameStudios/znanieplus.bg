import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { IObjectKeys } from '../helpers/interfaces';
import { LOCAL_STORAGE } from '../modules/local-storage';
import { MapProvider } from '../providers';
import { MainComponent } from './component';
import { CardProvider } from './providers';
import { HomeResolver, PartnerResolver } from './resolvers';

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
        path: 'partner/:key',
        loadChildren: () => import('./partner/index').then(m => m.PartnerModule),
        resolve: {
          item: PartnerResolver
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
        path: 'login',
        loadChildren: () => import('./login/index').then(m => m.LoginModule),
        data: {
          preload: true
        },
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/index').then(m => m.ProfileModule),
        canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
          const localStorage = inject(LOCAL_STORAGE);
          const cardrovider = inject(CardProvider);
          const router = inject(Router);

          const token = localStorage.getItem(MapProvider.USER);

          if(!token){
            router.navigateByUrl('/login');
            return false;
          }

          return cardrovider.get(token).pipe(map((result: IObjectKeys) => {
            if(result.active){
              return true;
            }
            router.navigateByUrl('/login');
            return false;
          }));
        }],
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
