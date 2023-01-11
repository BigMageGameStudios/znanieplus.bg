import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { CardComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { ScrollerModule } from 'src/app/shared/scroller-component';
import { GalleryModule } from 'src/app/shared/gallery-component';
import { BrokerModule } from 'src/app/shared/broker-component';
import { GalleryDialogModule } from 'src/app/shared/gallery-dialog';
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
        MatDialogModule,
        ContactsModule,
        ScrollerModule,
        GalleryModule,
        BrokerModule,
        GalleryDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})

export class CardModule { }
