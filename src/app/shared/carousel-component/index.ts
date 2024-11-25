import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { CarouselComponent } from './component';
import { DragModule } from 'src/app/directives/drag';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    DragModule,
    MatIconModule,
  ],
  declarations: [
    CarouselComponent
  ],
  exports: [
    CarouselComponent
  ]
})

export class CarouselModule { }
