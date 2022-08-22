import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatMenuModule, MatDialogModule } from '@angular/material';

import { MainAdminComponent } from './component';
import { UsersResolver, ApartmentsResolver, MyApartmentsResolver, WorkLogResolver } from '../resolvers';
import { ChangePasswordDialogModule, ChangePasswordDialog } from '../shared/change-password-dialog';

@NgModule({
  declarations: [
    MainAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainAdminComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/admin/apartments'
          },
          {
            path: 'work-log',
            loadChildren: () => import('./worklog/index').then(m => m.AdminWorkLogModule),
            resolve: {
              worklogs: WorkLogResolver
            }
          },
          {
            path: 'my-apartments',
            loadChildren: () => import('./my-apartments/index').then(m => m.AdminMyApartmentsModule),
            resolve: {
              apartments: MyApartmentsResolver
            }
          },
          {
            path: 'apartments',
            loadChildren: () => import('./apartments/index').then(m => m.AdminApartmentsModule),
            resolve: {
              apartments: ApartmentsResolver
            }
          },
          {
            path: 'users',
            loadChildren: () => import('./users/index').then(m => m.AdminUsersModule),
            resolve: {
              users: UsersResolver
            }
          }
        ]
      }
    ]),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    ChangePasswordDialogModule
  ],
  entryComponents: [
    ChangePasswordDialog
  ]
})

export class MainAdminModule { }
