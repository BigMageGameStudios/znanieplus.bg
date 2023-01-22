import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryDialog } from './component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule
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