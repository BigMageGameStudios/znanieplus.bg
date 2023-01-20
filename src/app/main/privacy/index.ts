import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrivacyComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';

@NgModule({
    declarations: [
        PrivacyComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: PrivacyComponent }]),
        ContactsModule
    ]
})

export class PrivacyModule { }
