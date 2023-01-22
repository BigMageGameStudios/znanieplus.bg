import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ErrorHandler, NgModule, ɵɵinject } from '@angular/core';
import { Router, RouterModule, UrlSerializer } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DOCUMENT, ViewportScroller } from '@angular/common';

import { TransferHttpCacheModule } from './modules/transfer-http';
import { PreloadStrategy } from './modules/preload-strategy';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { environment } from '../environments/environment';
import { ErrorIntercept } from './helpers/error.interceptor';
import { CustomViewportScroller } from './modules/custom-viewport-scroller';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'project' }),
    TransferHttpCacheModule,
    RouterModule.forRoot(MODULE_ROUTES, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      malformedUriErrorHandler: malFormedURI,
      preloadingStrategy: PreloadStrategy,
      anchorScrolling: 'enabled',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
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

export function malFormedURI(error: URIError, urlSerializer: UrlSerializer, url: string) {
  return urlSerializer.parse('/')
};
