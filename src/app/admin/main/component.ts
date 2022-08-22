import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { MapProvider } from 'src/app/providers';
import { SocketProvider, UserProvider } from '../providers';
import { ChangePasswordDialog } from '../shared/change-password-dialog';
import { UserRoles } from 'src/globals/config';

@Component({
  selector: 'main-admin-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainAdminComponent {

  user;

  userMenu = [
    {
      name: 'Работен дневник',
      icon: 'flaticon-list',
      link: '/admin/work-log'
    },
    {
      name: 'Мои апартаменти',
      icon: 'flaticon-apartment',
      link: '/admin/my-apartments'
    },
    {
      name: 'Всички Апартаменти',
      icon: 'flaticon-building',
      link: '/admin/apartments'
    }
  ];

  constructor(
    private MapProvider: MapProvider,
    private SocketProvider: SocketProvider,
    private UserProvider: UserProvider,
    private Router: Router,
    private MatDialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {
    this.user = this.MapProvider.get(this.MapProvider.USER);
    switch (this.user.role) {
      case (UserRoles.admin.id): {
        this.userMenu = [
          {
            name: 'Работен дневник',
            icon: 'flaticon-list',
            link: '/admin/work-log'
          },
          {
            name: 'Мои апартаменти',
            icon: 'flaticon-apartment',
            link: '/admin/my-apartments'
          },
          {
            name: 'Всички Апартаменти',
            icon: 'flaticon-building',
            link: '/admin/apartments'
          },
          {
            name: 'Потребители',
            icon: 'flaticon-user',
            link: '/admin/users'
          }
        ];
        break;
      }
      default: {
        this.userMenu = [
          {
            name: 'Работен дневник',
            icon: 'flaticon-list',
            link: '/admin/work-log'
          },
          {
            name: 'Мои апартаменти',
            icon: 'flaticon-apartment',
            link: '/admin/my-apartments'
          },
          {
            name: 'Всички Апартаменти',
            icon: 'flaticon-building',
            link: '/admin/apartments'
          }
        ];
        break;
      }
    }
  }

  logOut() {
    this.UserProvider.logOut().subscribe(({ result }) => {
      if (result) {
        this.ChangeDetectorRef.markForCheck();
        this.Router.navigateByUrl('/');
      }
    });
  }

  changePassword() {
    this.MatDialog.open(ChangePasswordDialog);
  }

}
