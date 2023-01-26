import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'

import { ConfirmDialog } from './component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule
  ],
  declarations: [
    ConfirmDialog
  ],
  exports: [
    ConfirmDialog
  ]
})

class ConfirmDialogModule { }

export {
  ConfirmDialog,
  ConfirmDialogModule
}
