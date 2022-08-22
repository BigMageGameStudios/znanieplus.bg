import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatButtonModule, } from '@angular/material';

import { LoginComponent } from './component';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule, 
    MatInputModule, 
    MatButtonModule
  ]
})

export class LoginModule { }
