import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkLogProvider } from '../../providers/WorkLogProvider';

@Component({
    selector: 'worklog-dialog',
    templateUrl: './index.html',
    styleUrls: ['./style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkLogDialog {

    isSubmit = false;
    errors: any = {};
    edit = false;

    form = new FormGroup({
        log: new FormControl('', [
            Validators.required,
            Validators.maxLength(16384)
        ])
    });

    constructor(
        private MatDialogRef: MatDialogRef<WorkLogDialog>,
        private ChangeDetectorRef: ChangeDetectorRef,
        private WorkLogProvider: WorkLogProvider,
        @Inject(MAT_DIALOG_DATA) private data
    ) {

        const { worklog } = this.data;

        if (worklog) {
            this.edit = true;
            this.setValues(worklog);
        }

    }

    setValues(apartment) {
        const value = {};
        for (let key in this.form.controls) {
            value[key] = apartment[key];
        }
        this.form.setValue(value);
    }

    submit() {
        if (this.edit) {
            return this.editWorkLog();
        }
        return this.createWorkLog();
    }

    editWorkLog() {
        if (this.form.valid) {

            const update = {};
            const { worklog } = this.data;
            const values = this.form.value;
            this.isSubmit = true;

            for (let key in values) {
                if (values[key] !== worklog[key]) {
                    update[key] = values[key];
                }
            }

            this.WorkLogProvider.put(worklog._id, update).subscribe(({ result, errors }) => {
                if (errors) {
                    this.errors = errors;
                    this.isSubmit = false;
                    Object.keys(this.errors).forEach((e: string) => {
                        this.form.controls[e].setErrors({ 'incorrect': true });
                    });
                    return this.ChangeDetectorRef.markForCheck();
                };
                this.MatDialogRef.close();
            });

        }
    }

    createWorkLog() {
        if (this.form.valid) {
            this.isSubmit = true;
            this.WorkLogProvider.post(this.form.value).subscribe(({ result, errors }) => {
                if (errors) {
                    this.errors = errors;
                    this.isSubmit = false;
                    Object.keys(this.errors).forEach((e: string) => {
                        this.form.controls[e].setErrors({ 'incorrect': true });
                    });
                    return this.ChangeDetectorRef.markForCheck();
                };
                return this.MatDialogRef.close();
            });
        }
    }

}
