import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApartmentComponent } from './component';
import { LazyImageModule } from '../lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LazyImageModule
  ],
  declarations: [
    ApartmentComponent
  ],
  exports: [
    ApartmentComponent
  ]
})

export class ApartmentModule { }
