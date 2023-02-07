import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { PartnerTypes } from 'src/globals';
import { IObjectKeys } from '../helpers/interfaces';
import { WINDOW } from '../modules/window';
import { UserProvider } from '../providers';
import { MainComponent } from './component';
import { CardProvider, PartnerProvider } from './providers';
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
        path: 'partners',
        loadChildren: () => import('./partners/index').then(m => m.PartnersModule),
        resolve: {
          partners: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const { page = 1 } = route.queryParams;
            const partnerProvider = inject(PartnerProvider);

            return partnerProvider.getList({
              skip: 0,
              limit: Number(page) * 10,
              type: PartnerTypes.sale.id
            });
        
          }
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
        path: 'login-scan',
        loadChildren: () => import('./login-scan/index').then(m => m.LoginModule),
        data: {
          preload: true
        },
      },
      {
        path: 'login-input',
        loadChildren: () => import('./login-input/index').then(m => m.LoginModule),
        data: {
          preload: true
        },
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/index').then(m => m.ProfileModule),
        canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
          const userProvider = inject(UserProvider);
          const cardrovider = inject(CardProvider);
          const window = inject(WINDOW);
          const router = inject(Router);

          const token = userProvider.getCode();

          if (!token) {
            router.navigateByUrl(window.innerWidth <= 830 ? '/login-scan' : '/login-input');
            return false;
          }

          return cardrovider.get(token).pipe(map((result: IObjectKeys) => {
            if (result.active) {
              return true;
            }
            router.navigateByUrl(window.innerWidth <= 830 ? '/login-scan' : '/login-input');
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
