import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { CardComponent } from './component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        CardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: CardComponent }]),
        MatButtonModule,
        MatRippleModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})

export class CardModule { }
