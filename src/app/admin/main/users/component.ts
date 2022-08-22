import { Component, ChangeDetectionStrategy, Inject, PLATFORM_ID, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user';
import { UserDialog } from '../../shared/user-dialog';
import { SocketProvider, UserProvider } from '../../providers';
import { AdminWorklogDialog } from '../../shared/admin-worklog-dialog';

@Component({
  selector: 'admin-users-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminUsersComponent implements OnInit, OnDestroy {

  postUser;
  putUser;

  skip = 20;
  limit = 20;
  loaded = false;
  dataSource = new BehaviorSubject<User[]>([]);
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'position', 'role', 'active'];

  constructor(
    private MatDialog: MatDialog,
    private ActiveRoute: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef,
    private SocketProvider: SocketProvider,
    private UserProvider: UserProvider,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    const { users } = this.ActiveRoute.snapshot.data;
    this.dataSource.next([...users]);

    if (users.length < this.limit) {
      this.loaded = true;
    }

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.postUser = this.SocketProvider.postUser.subscribe((user) => {
        this.skip++;
        this.dataSource.next([user, ...this.dataSource.getValue()]);
        this.ChangeDetectorRef.markForCheck();
      });
      this.putUser = this.SocketProvider.putUser.subscribe((user) => {
        if (this.updateUsers(user)) {
          this.ChangeDetectorRef.markForCheck();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.postUser) {
      this.postUser.unsubscribe();
    }
    if (this.putUser) {
      this.putUser.unsubscribe();
    }
  }

  updateUsers(user) {
    const users = this.dataSource.getValue();
    for (let i = 0; i < users.length; i++) {
      if (user.userId === users[i]._id) {
        users[i] = new User({
          ...users[i],
          ...user.data
        })
        this.dataSource.next([...users]);
        return true;
      }
    }
    return false;
  }

  openDialog(user?) {
    this.MatDialog.open(UserDialog, {
      panelClass: 'overflow-y-dialog',
      data: {
        user
      }
    });
  }

  changeActive(event, user) {
    const { checked } = event;
    this.UserProvider.put(user._id, {
      active: checked
    }).subscribe();
  }

  onLoadMore() {
    if (!this.loaded) {
      this.UserProvider.get({
        skip: this.skip,
        limit: this.limit
      }).subscribe((data) => {

        this.skip += this.limit;

        if (data.length < this.limit) {
          this.loaded = true;
        }

        const arr = [...this.dataSource.getValue(), ...data];
        this.dataSource.next(arr);
        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

  openWorkLog(user) {
    this.MatDialog.open(AdminWorklogDialog, {
      panelClass: 'admin-worklog-dialog',
      autoFocus: false,
      data: {
        user
      }
    });
  }

}