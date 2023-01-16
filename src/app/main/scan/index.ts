import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { ScanPage } from './component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  declarations: [
    ScanPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ScanPage
    }]),
    MatDialogModule,
    LazyImageModule,
    ConfirmDialogModule,
  ]
})

export class ScanModule { }