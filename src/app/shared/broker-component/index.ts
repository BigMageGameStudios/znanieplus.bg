import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrokerComponent } from './component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    BrokerComponent
  ],
  exports: [
    BrokerComponent
  ]
})

export class BrokerModule { }
