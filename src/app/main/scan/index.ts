import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { ScanPage } from './component';

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
    MatDialogModule
  ]
})

export class ScanModule { }
