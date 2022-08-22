import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { GalleryDialog } from './component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
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