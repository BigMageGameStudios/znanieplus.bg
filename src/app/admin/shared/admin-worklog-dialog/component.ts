import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { WorkLogProvider } from '../../providers';

@Component({
    selector: 'admin-worklog-dialog',
    templateUrl: './index.html',
    styleUrls: ['./style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminWorklogDialog implements OnInit {

    user;
    skip = 0;
    limit = 20;
    loaded = false;
    worklogs = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) private data,
        private WorkLogProvider: WorkLogProvider,
        private ChangeDetectorRef: ChangeDetectorRef
    ) {
        this.user = data.user;
    }

    ngOnInit() {
        this.loadMore();
    }


    loadMore() {
        if (!this.loaded) {
            this.WorkLogProvider.getAdmin({
                skip: this.skip,
                limit: this.limit,
                userId: this.user._id
            }).subscribe((data) => {

                this.skip += this.limit;

                if (data.length < this.limit) {
                    this.loaded = true;
                }

                this.worklogs = [...this.worklogs, ...data];
                this.ChangeDetectorRef.markForCheck();
            });
        }
    }

}
