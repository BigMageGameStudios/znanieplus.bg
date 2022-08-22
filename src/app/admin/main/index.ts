import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    ]
})

export class MainAdminModule { }
