import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './component';
import { LazyImageModule } from '../lazy-image-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LazyImageModule
  ],
  declarations: [
    CompanyComponent
  ],
  exports: [
    CompanyComponent
  ]
})

export class CompanyModule { }
