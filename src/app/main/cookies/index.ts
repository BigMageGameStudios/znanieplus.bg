import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CookiesComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';

@NgModule({
    declarations: [
     CookiesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: CookiesComponent }]),
        ContactsModule
    ]
})

export class CookiesModule { }
