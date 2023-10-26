import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PetrolComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { FooterModule } from 'src/app/shared/footer-component';

@NgModule({
    declarations: [
        PetrolComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: PetrolComponent }]),
        ContactsModule,
        FooterModule
    ]
})

export class PetrolModule { }
