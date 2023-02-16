import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CookiesComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { FooterModule } from 'src/app/shared/footer-component';

@NgModule({
    declarations: [
     CookiesComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: CookiesComponent }]),
        ContactsModule,
        FooterModule
    ]
})

export class CookiesModule { }
