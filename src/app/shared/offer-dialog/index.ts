import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'

import { OfferDialog } from './component';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailProvider } from 'src/app/providers/MailProvider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule
  ],
  declarations: [
    OfferDialog
  ],
  providers: [
    MailProvider
  ],
  exports: [
    OfferDialog
  ]
})

class OfferDialogModule { }

export {
  OfferDialog,
  OfferDialogModule
}
