import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatButtonModule } from '@angular/material';

import { RentComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { ApartmentModule } from 'src/app/shared/apartment-component';

@NgModule({
  declarations: [
    RentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RentComponent }]),
    FormsModule,
    MatSelectModule,
    MatButtonModule,

    ContactsModule,
    ApartmentModule
  ]
})

export class RentModule { }
