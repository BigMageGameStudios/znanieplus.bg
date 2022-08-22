import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatButtonModule, } from '@angular/material';

import { ForgottenPasswordComponent } from './component';

@NgModule({
  declarations: [
    ForgottenPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ForgottenPasswordComponent }]),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})

export class ForgottenPasswordModule { }
