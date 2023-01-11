import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { PlaceComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { GalleryModule } from 'src/app/shared/gallery-component';
import { GalleryDialogModule } from 'src/app/shared/gallery-dialog';

@NgModule({
    declarations: [
     PlaceComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: PlaceComponent }]),
        MatButtonModule,
        MatRippleModule,
        MatDialogModule,
        ContactsModule,
        GalleryModule,
        GalleryDialogModule
    ]
})

export class PlaceModule { }
