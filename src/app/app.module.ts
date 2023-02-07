import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Router, RouterModule, UrlSerializer } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TransferHttpCacheModule } from './modules/transfer-http';
import { PreloadStrategy } from './modules/preload-strategy';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { ErrorIntercept } from './helpers/error.interceptor';
import { UserProvider } from './providers';

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
      scrollOffset: () => {
        return [0, 84]
      },
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
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [
        Router,
        UserProvider
      ],
      multi: true
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

export function init_app(
  router: Router,
  userProvider: UserProvider,
) {
  return async () => {
    try{
      userProvider.init();
    }catch(error){
      router.navigate(['/error']);
    }
  }
}