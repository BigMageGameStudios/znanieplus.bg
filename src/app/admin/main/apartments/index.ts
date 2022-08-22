import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDialogModule, MatExpansionModule, MatRippleModule } from '@angular/material';

import { AdminApartmentsComponent } from './component';
import { ApartmentDialog, ApartmentDialogModule } from '../../shared/apartment-dialog';
import { GalleryDialog, GalleryDialogModule } from 'src/app/shared/gallery-dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'src/app/shared/confirm-dialog';

@NgModule({
  declarations: [
    AdminApartmentsComponent,
  ],
  entryComponents: [
    ApartmentDialog,
    GalleryDialog,
    ConfirmDialog
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
