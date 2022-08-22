import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatButtonModule, } from '@angular/material';

import { ResetPasswordComponent } from './component';

@NgModule({
  declarations: [
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ResetPasswordComponent }]),
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule, 
    MatInputModule, 
    MatButtonModule
  ]
})

export class ResetPasswordModule { }
