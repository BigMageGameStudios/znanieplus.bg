import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { PartnerComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { GalleryModule } from 'src/app/shared/gallery-component';
import { GalleryDialogModule } from 'src/app/shared/gallery-dialog';
import { SafeHTMLModule } from 'src/app/pipes/safe-html';
import { FooterModule } from 'src/app/shared/footer-component';
import {CarouselModule} from "../../shared/carousel-component";

@NgModule({
    declarations: [
     PartnerComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: PartnerComponent }]),
        MatButtonModule,
        MatRippleModule,
        MatDialogModule,
        ContactsModule,
        GalleryModule,
        SafeHTMLModule,
        GalleryDialogModule,
        FooterModule,
        CarouselModule
    ]
})

export class PartnerModule { }
