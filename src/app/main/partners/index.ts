import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PartnersComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { PartnerModule } from 'src/app/shared/partner-component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PartnersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PartnersComponent }]),
    FormsModule,
    MatSelectModule,
    MatButtonModule,

    ContactsModule,
    PartnerModule
  ]
})

export class PartnersModule { }
