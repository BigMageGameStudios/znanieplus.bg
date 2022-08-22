import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatRippleModule } from '@angular/material';

import { ApartmentDialog } from './component';
import { SafeURLModule } from 'src/app/pipes/safe-url.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SafeURLModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRippleModule,
    MatCheckboxModule
  ],
  declarations: [
    ApartmentDialog
  ],
  exports: [
    ApartmentDialog
  ]
})

class ApartmentDialogModule { }

export {
  ApartmentDialogModule,
  ApartmentDialog
}