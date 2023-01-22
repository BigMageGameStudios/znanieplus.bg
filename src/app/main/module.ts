import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MODULE_ROUTES, MODULE_COMPONENTS } from './routes';
import { MainProvidersModule } from './providers/module';
import { MainResolversModule } from './resolvers/module';

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
    MainResolversModule
  ]
})

export class MainModule { }
