import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ApartmentComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { ScrollerModule } from 'src/app/shared/scroller-component';
import { GalleryModule } from 'src/app/shared/gallery-component';
import { BrokerModule } from 'src/app/shared/broker-component';
import { GalleryDialogModule, GalleryDialog } from 'src/app/shared/gallery-dialog';

@NgModule({
  declarations: [
    ApartmentComponent,
  ],
  entryComponents: [
    GalleryDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ApartmentComponent }]),
    MatButtonModule,
    MatRippleModule,
    MatDialogModule,
    ContactsModule,
    ScrollerModule,
    GalleryModule,
    BrokerModule,
    GalleryDialogModule
  ]
})

export class ApartmentModule { }
