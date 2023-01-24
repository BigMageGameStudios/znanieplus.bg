import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { SafeHTMLModule } from 'src/app/pipes/safe-html';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [
     ProfileComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: ProfileComponent }]),
        ContactsModule,
        SafeHTMLModule,
        MatRippleModule
    ]
})

export class ProfileModule { }
