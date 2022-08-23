import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerModule, } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UNIVERSAL_LOCAL_STORAGE } from '../../server/local-storage';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule,
    NoopAnimationsModule
  ],
  providers: [
    UNIVERSAL_LOCAL_STORAGE
  ],
  bootstrap: [
    AppComponent
  ]
})
 
export class AppServerModule { }
