import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CompaniesComponent } from './component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { CompanyModule } from 'src/app/shared/company-component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FooterModule } from 'src/app/shared/footer-component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    CompaniesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: CompaniesComponent}]),
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ContactsModule,
    CompanyModule,
    FooterModule,
    MatCheckboxModule
  ]
})

export class CompaniesModule { }
