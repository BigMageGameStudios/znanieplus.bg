import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { LoginComponent } from './component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FooterModule } from 'src/app/shared/footer-component';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
        MatButtonModule,
        MatRippleModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        FooterModule
    ]
})

export class LoginModule { }
