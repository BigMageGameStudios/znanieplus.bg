import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToolbarComponent } from './component';
import { DrawerModule } from 'src/app/shared/drawer-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule,
    MatToolbarModule,
    DrawerModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ]
})

class ToolbarModule { }

export {
  ToolbarComponent,
  ToolbarModule
}