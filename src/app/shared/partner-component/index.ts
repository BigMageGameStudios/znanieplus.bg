import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './component';
import { LazyImageModule } from '../lazy-image-component';
import {SafeHTMLModule} from "../../pipes/safe-html";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LazyImageModule,
    SafeHTMLModule
  ],
  declarations: [
    PartnerComponent
  ],
  exports: [
    PartnerComponent
  ]
})

export class PartnerModule { }
