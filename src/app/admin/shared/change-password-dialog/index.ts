import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { ChangePasswordDialog } from './component';

@NgModule({
  declarations: [
    ChangePasswordDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ]
})

class ChangePasswordDialogModule { }

export {
  ChangePasswordDialog,
  ChangePasswordDialogModule
}