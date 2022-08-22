import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatButtonModule, MatDialogModule, MatSlideToggleModule } from '@angular/material';
import { UserDialog, UserDialogModule } from '../../shared/user-dialog';

import { AdminUsersComponent } from './component';
import { AdminWorklogDialog, AdminWorklogDialogModule } from '../../shared/admin-worklog-dialog';

@NgModule({
  declarations: [
    AdminUsersComponent,
  ],
  entryComponents: [
    UserDialog,
    AdminWorklogDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminUsersComponent }]),
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    UserDialogModule,
    AdminWorklogDialogModule
  ]
})

export class AdminUsersModule { }
