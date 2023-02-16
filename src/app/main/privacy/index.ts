import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrivacyComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { FooterModule } from 'src/app/shared/footer-component';

@NgModule({
    declarations: [
        PrivacyComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: PrivacyComponent }]),
        ContactsModule,
        FooterModule
    ]
})

export class PrivacyModule { }
