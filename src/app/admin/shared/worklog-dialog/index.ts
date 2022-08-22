import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { WorkLogDialog } from './component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    WorkLogDialog
  ],
  exports: [
    WorkLogDialog
  ]
})

class WorkLogDialogModule { }

export {
  WorkLogDialogModule,
  WorkLogDialog
}