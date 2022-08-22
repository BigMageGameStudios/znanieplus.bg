import { Component, Inject, PLATFORM_ID, ChangeDetectionStrategy, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { UserProvider } from '../providers';

@Component({
  selector: 'login-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements AfterViewInit {

  errors: any = {};
  isSubmit = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.minLength(6)
    ])
  });

  @ViewChild('email', { static: true }) email: ElementRef;

  constructor(
    private UserProvider: UserProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
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
      this.UserProvider.postAuthenticate(this.loginForm.value).subscribe(({ result, errors }) => {
        if (errors) {
          this.errors = errors;
          this.isSubmit = false;
          Object.keys(this.errors).forEach((e: string) => {
            this.loginForm.controls[e].setErrors({ 'incorrect': true });
          });
          return this.ChangeDetectorRef.markForCheck();
        }
        return this.Router.navigateByUrl('/admin');
      });
    }
  }

}
