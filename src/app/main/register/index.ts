import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';


import { RegisterComponent } from './component';
import { ScrollerModule } from '../../shared/scroller-component';
import { ContactsModule } from 'src/app/shared/contacts-component';
import { FooterModule } from 'src/app/shared/footer-component';
import { NewsProvider } from '../providers';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
        resolve: {
          news: () => inject(NewsProvider).get()
        },
      }
    ]),
    MatRippleModule,
    ScrollerModule,
    ContactsModule,
    MatExpansionModule,
    FooterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ]
})

export class RegisterModule { }
