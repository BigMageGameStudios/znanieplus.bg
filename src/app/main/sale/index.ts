import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { SaleComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { ApartmentModule } from 'src/app/shared/apartment-component';

@NgModule({
  declarations: [
    SaleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SaleComponent }]),
    FormsModule,
    MatSelectModule,
    MatButtonModule,

    ContactsModule,
    ApartmentModule
  ]
})

export class SaleModule { }
