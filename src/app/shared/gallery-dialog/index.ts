import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { GalleryDialog } from './component';
import { LazyImageModule } from '../lazy-image-component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    LazyImageModule
  ],
  declarations: [
    GalleryDialog
  ],
  exports: [
    GalleryDialog
  ]
})

class GalleryDialogModule { }

export {
  GalleryDialogModule,
  GalleryDialog
}