import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { UserProvider } from 'src/app/admin/providers';
import { passwordMatchValidator } from 'src/app/utilities/validator';


@Component({
  selector: 'change-password-dialog',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChangePasswordDialog {

  isSubmit = false;
  errors: any = {};
  form = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ])
  }, passwordMatchValidator);


  constructor(
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private MatDialogRef: MatDialogRef<ChangePasswordDialog>
  ) { }

  close() {
    this.MatDialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;
      this.UserProvider.updatePassowrd(this.form.value).subscribe(({ result, errors }) => {

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

}
