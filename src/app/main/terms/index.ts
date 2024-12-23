import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TermsComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { FooterModule } from 'src/app/shared/footer-component';

@NgModule({
    declarations: [
        TermsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: TermsComponent }]),
        ContactsModule,
        FooterModule
    ]
})

export class TermsModule { }
