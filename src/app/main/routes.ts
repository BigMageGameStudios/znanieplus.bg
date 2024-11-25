import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { MainComponent } from './component';
import { CompanyProvider, NewsProvider, PartnerProvider } from './providers';
import { HomeResolver, PartnerResolver } from './resolvers';
import { UserProvider } from '../providers';

export const MODULE_ROUTES: Route[] = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/index').then(m => m.HomeModule),
        resolve: {
          result: HomeResolver,
          media: () => inject(NewsProvider).getMedia()
        },
        data: {
          preload: true
        },
      },
      {
        path: 'about',
        loadChildren: () => import('./about/index').then(m => m.AboutModule),
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
          data: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const { page = 1 } = route.queryParams;
            const partnerProvider = inject(PartnerProvider);

            return forkJoin([
              partnerProvider.getList({
                skip: 0,
                limit: 300
              }),
              partnerProvider.getTypes(),
              partnerProvider.getCities()
            ]).pipe(map(([partners, types, cities]) => {
              return {
                partners,
                types,
                cities
              }
            }))
          }
        },
        data: {
          preload: true
        },
      },
      {
        path: 'companies',
        loadChildren: () => import('./companies/index').then(m => m.CompaniesModule),
        resolve: {
          data: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const { page = 1 } = route.queryParams;
            const companyProvider = inject(CompanyProvider);

            return forkJoin([
              companyProvider.getList()
            ]).pipe(map(([companies]) => {
              return {
                companies
              }
            }))
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
        canActivate: [
          () => {
            const userProvider = inject(UserProvider);
            const router = inject(Router);
            if(userProvider.user()?.isAdmin){
              return true;
            }

            router.navigateByUrl("/");
            return false;
          }
        ]
      },
      {
        path: 'cookies',
        loadChildren: () => import('./cookies/index').then(m => m.CookiesModule),
        data: {
          preload: true
        },
      },
      {
        path: 'petrol',
        loadChildren: () => import('./petrol/index').then(m => m.PetrolModule),
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
