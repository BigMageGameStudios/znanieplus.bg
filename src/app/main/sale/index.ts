import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatButtonModule } from '@angular/material';

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
