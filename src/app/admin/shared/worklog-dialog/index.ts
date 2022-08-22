import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';

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