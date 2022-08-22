import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { RouterModule, UrlSerializer } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { MODULE_COMPONENTS, MODULE_ROUTES } from './app.routes';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'project' }),
    TransferHttpCacheModule,
    RouterModule.forRoot(MODULE_ROUTES, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    malformedUriErrorHandler: malFormedURI,
    scrollOffset: [0, 84],
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'legacy'
}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppModule { }

export function malFormedURI(error: URIError, urlSerializer: UrlSerializer, url: string) {
  return urlSerializer.parse('/')
};
