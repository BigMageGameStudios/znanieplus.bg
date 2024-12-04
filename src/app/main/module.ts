import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { DrawerModule } from '../shared/drawer-component';
import { ToolbarModule } from '../shared/toolbar-component';

import { MODULE_ROUTES, MODULE_COMPONENTS } from './routes';
import { MainProvidersModule } from './providers/module';
import { MainResolversModule } from './resolvers/module';
import { MatRippleModule } from '@angular/material/core';
import { OfferDialogModule } from '../shared/offer-dialog';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    ToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    DrawerModule,
    MatDialogModule,
    MainProvidersModule,
    MainResolversModule,
    MatRippleModule,
    OfferDialogModule,

  ]
})

export class MainModule { }
