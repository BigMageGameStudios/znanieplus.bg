import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { MODULE_ROUTES, MODULE_COMPONENTS } from './routes';
import { AdminGuardsModule } from './guards/module';
import { AdminProvidersModule } from './providers/module';
import { AdminResolversModule } from './resolvers/module';

@NgModule({
  declarations: [
    MODULE_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    MatButtonModule,
    AdminProvidersModule,
    AdminGuardsModule,
    AdminResolversModule
  ]
})

export class AdminModule { }
