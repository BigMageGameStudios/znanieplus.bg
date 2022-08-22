import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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