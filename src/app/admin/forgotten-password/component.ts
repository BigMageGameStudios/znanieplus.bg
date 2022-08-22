import { Component, Inject, PLATFORM_ID, ChangeDetectionStrategy, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { UserProvider } from '../providers';

@Component({
  selector: 'forgotten-password',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ForgottenPasswordComponent implements AfterViewInit {

  errors: any = {};
  result = false;
  isSubmit = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
    ])
  });

  @ViewChild('email', { static: true }) email: ElementRef;

  constructor(
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.email.nativeElement.focus();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmit = true;

      this.UserProvider.resetPassword(this.loginForm.value).subscribe(({ result, errors }) => {

        if (errors) {
          this.errors = errors;
          this.isSubmit = false;

          Object.keys(this.errors).forEach((e: string) => {
            this.loginForm.controls[e].setErrors({ 'incorrect': true });
          });
          return this.ChangeDetectorRef.markForCheck();
        }

        this.result = result;
        return this.ChangeDetectorRef.markForCheck();

      });
    }
  }

}
