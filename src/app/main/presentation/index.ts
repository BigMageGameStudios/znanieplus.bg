import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PresentationComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';

@NgModule({
    declarations: [
     PresentationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: PresentationComponent }]),
        ContactsModule
    ]
})

export class PresentationModule { }
