import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminWorklogDialog } from './component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [
    AdminWorklogDialog
  ],
  exports: [
    AdminWorklogDialog
  ]
})

class AdminWorklogDialogModule { }

export {
  AdminWorklogDialogModule,
  AdminWorklogDialog
}