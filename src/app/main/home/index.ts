import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material';

import { HomeComponent } from './component';
import { ScrollerModule } from '../../shared/scroller-component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { LazyImageModule } from 'src/app/shared/lazy-image-component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ]),
    MatRippleModule,
    ScrollerModule,
    ContactsModule,
    LazyImageModule
  ]
})

export class HomeModule { }
