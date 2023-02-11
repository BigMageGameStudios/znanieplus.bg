import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { LoginPage } from './component';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LoginPage
    }]),
    MatDialogModule,
    ConfirmDialogModule
  ]
})

export class LoginModule { }
