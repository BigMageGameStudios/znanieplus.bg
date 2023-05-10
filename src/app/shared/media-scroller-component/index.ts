import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { MediaScrollerComponent } from './component';
import { DragModule } from 'src/app/directives/drag';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    DragModule
  ],
  declarations: [
    MediaScrollerComponent
  ],
  exports: [
    MediaScrollerComponent
  ]
})

export class MediaScrollerModule { }
