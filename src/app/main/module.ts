import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatMenuModule, MatSelectModule, MatCheckboxModule, MatSidenavModule, MatDialogModule } from '@angular/material';

import { MODULE_ROUTES, MODULE_COMPONENTS } from './routes';
import { MainProvidersModule } from './providers/module';
import { MainResolversModule } from './resolvers/module';
import { LazyImageModule } from '../shared/lazy-image-component';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatDialogModule,
    MainProvidersModule,
    MainResolversModule,
    LazyImageModule
  ]
})

export class MainModule { }
