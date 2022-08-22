import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatExpansionModule } from '@angular/material';

import { AdminWorkLogComponent } from './component';
import { WorkLogDialog, WorkLogDialogModule } from '../../shared/worklog-dialog';

@NgModule({
  declarations: [
    AdminWorkLogComponent,
  ],
  entryComponents: [
    WorkLogDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminWorkLogComponent }]),
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    WorkLogDialogModule
  ]
})

export class AdminWorkLogModule { }
