import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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