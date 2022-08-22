import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { AdminApartmentsComponent } from './component';
import { ApartmentDialog, ApartmentDialogModule } from '../../shared/apartment-dialog';
import { GalleryDialog, GalleryDialogModule } from 'src/app/shared/gallery-dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
    declarations: [
        AdminApartmentsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: AdminApartmentsComponent }]),
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatRippleModule,
        ApartmentDialogModule,
        GalleryDialogModule,
        ConfirmDialogModule
    ]
})

export class AdminApartmentsModule { }
