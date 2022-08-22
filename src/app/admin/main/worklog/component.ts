import { Component, ChangeDetectionStrategy, OnDestroy, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { WorkLogDialog } from '../../shared/worklog-dialog';
import { SocketProvider, WorkLogProvider } from '../../providers';

@Component({
  selector: 'admin-worklog-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminWorkLogComponent implements OnInit, OnDestroy {

  worklogs;
  postWorklog
  putWorklog;

  skip = 20;
  limit = 20;
  loaded = false;

  constructor(
    private MatDialog: MatDialog,
    private ActiveRoute: ActivatedRoute,
    private SocketProvider: SocketProvider,
    private WorkLogProvider: WorkLogProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    const { worklogs } = this.ActiveRoute.snapshot.data;
    this.worklogs = worklogs;
    if (worklogs.length < this.limit) {
      this.loaded = true;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.postWorklog = this.SocketProvider.postWorklog.subscribe((worklog) => {
        this.skip++;
        this.worklogs.unshift(worklog)
        this.ChangeDetectorRef.markForCheck();
      });
      this.putWorklog = this.SocketProvider.putWorklog.subscribe((worklog) => {
        if (this.updateWorkLogs(worklog)) {
          this.ChangeDetectorRef.markForCheck();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.postWorklog) {
      this.postWorklog.unsubscribe();
    }
    if (this.putWorklog) {
      this.putWorklog.unsubscribe();
    }
  }

  onLoadMore() {
    if (!this.loaded) {
      this.WorkLogProvider.get({
        skip: this.skip,
        limit: this.limit
      }).subscribe((data) => {

        this.skip += this.limit;

        if (data.length < this.limit) {
          this.loaded = true;
        }

        const arr = [...this.worklogs, ...data];
        this.worklogs = arr;
        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

  openDialog(event, worklog?) {
    this.MatDialog.open(WorkLogDialog, {
      data: {
        worklog
      }
    });
    event.stopPropagation();
  }


  track(index, worklog) {
    return worklog._id;
  }

  updateWorkLogs(worklog) {
    const index = this.getWorklog(worklog);
    if (index > -1) {
      const worklogs = this.worklogs;
      worklogs[index] = {
        ...worklogs[index],
        ...worklog.data
      }
      this.worklogs = worklogs
      return true;
    }
    return false;
  }

  getWorklog(worklog) {
    const worklogs = this.worklogs;
    for (let i = 0; i < worklogs.length; i++) {
      if (worklog.worklogId === worklogs[i]._id) {
        return i;
      }
    }
    return -1;
  }


}
