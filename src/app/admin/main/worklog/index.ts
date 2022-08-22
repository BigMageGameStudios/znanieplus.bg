import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

import { AdminWorkLogComponent } from './component';
import { WorkLogDialog, WorkLogDialogModule } from '../../shared/worklog-dialog';

@NgModule({
    declarations: [
        AdminWorkLogComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: AdminWorkLogComponent }]),
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        WorkLogDialogModule
    ]
})

export class AdminWorkLogModule { }
