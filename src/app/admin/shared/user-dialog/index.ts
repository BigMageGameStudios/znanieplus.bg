import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatSelectModule } from '@angular/material';

import { UserDialog } from './component';
import { SafeURLModule } from 'src/app/pipes/safe-url.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    SafeURLModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    UserDialog
  ],
  exports: [
    UserDialog
  ]
})

class UserDialogModule { }

export {
  UserDialogModule,
  UserDialog
}