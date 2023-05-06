import { provideClientHydration } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule, ɵɵinject } from '@angular/core';
import { Router, RouterModule, provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { DOCUMENT, ViewportScroller } from '@angular/common';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { ErrorIntercept } from './helpers/error.interceptor';
import { CustomViewportScroller } from './modules/custom-viewport-scroller';
import { UserProvider } from './providers';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  providers: [
    provideRouter(MODULE_ROUTES,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
    ),
    provideClientHydration(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [
        Router,
        UserProvider
      ],
      multi: true
    },
    {
      provide: ViewportScroller,
      useFactory: () => new CustomViewportScroller(ɵɵinject(DOCUMENT), window, ɵɵinject(ErrorHandler), ɵɵinject(Router))
    },
  ],
  exports: [
    RouterModule
  ]
})

export class AppModule { }

export function init_app(
  router: Router,
  userProvider: UserProvider,
) {
  return async () => {
    try {
      userProvider.init();
    } catch (error) {
      router.navigate(['/error']);
    }
  }
}