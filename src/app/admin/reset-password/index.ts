import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

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
