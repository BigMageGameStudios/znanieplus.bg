import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactsComponent } from './component';
import { MatButtonModule } from '@angular/material/button';
import { MailProvider } from 'src/app/providers/MailProvider';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule
  ],
  providers: [
    MailProvider
  ],
  declarations: [
    ContactsComponent
  ],
  exports: [
    ContactsComponent
  ]
})

export class ContactsModule { }
