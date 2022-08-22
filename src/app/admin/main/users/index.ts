import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
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
