import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { AdminMyApartmentsComponent } from './component';
import { ApartmentDialog, ApartmentDialogModule } from '../../shared/apartment-dialog';
import { GalleryDialog, GalleryDialogModule } from 'src/app/shared/gallery-dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
    declarations: [
        AdminMyApartmentsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: AdminMyApartmentsComponent }]),
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatRippleModule,
        ApartmentDialogModule,
        GalleryDialogModule,
        ConfirmDialogModule
    ]
})

export class AdminMyApartmentsModule { }
