import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    ContactsComponent
  ],
  exports: [
    ContactsComponent
  ]
})

export class ContactsModule { }
