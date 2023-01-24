import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { LoginPage } from './component';

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
    MatDialogModule
  ]
})

export class LoginModule { }
