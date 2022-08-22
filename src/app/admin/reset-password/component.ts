import { Component, Inject, PLATFORM_ID, ChangeDetectionStrategy, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { UserProvider } from '../providers';
import { passwordMatchValidator } from 'src/app/utilities/validator';

@Component({
  selector: 'reset-password-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResetPasswordComponent implements AfterViewInit {

  token;
  errors: any = {};
  isSubmit = false;
  result = false;

  form = new FormGroup({
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

  @ViewChild('password', { static: true }) password: ElementRef;

  constructor(
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private ActivatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.token = this.ActivatedRoute.snapshot.params.token;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.password.nativeElement.focus();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmit = true;

      this.UserProvider.putResetPassword({
        token: this.token,
        ...this.form.value
      }).subscribe(({ result, errors }) => {
        if (errors) {
          this.errors = errors;
          this.isSubmit = false;

          Object.keys(this.errors).forEach((e: string) => {
            this.form.controls[e].setErrors({ 'incorrect': true });
          });
          return this.ChangeDetectorRef.markForCheck();
        }
        this.result = result;
        return this.ChangeDetectorRef.markForCheck();
      });
    }
  }

}
