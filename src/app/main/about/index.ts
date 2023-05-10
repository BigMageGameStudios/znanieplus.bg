import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';


import { AboutComponent } from './component';
import { ScrollerModule } from '../../shared/scroller-component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { FooterModule } from 'src/app/shared/footer-component';
import { NewsProvider } from '../providers';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
        resolve: {
          news: () => inject(NewsProvider).get()
        },
      }
    ]),
    MatRippleModule,
    ScrollerModule,
    ContactsModule,
    MatExpansionModule,
    FooterModule
  ]
})

export class AboutModule { }
