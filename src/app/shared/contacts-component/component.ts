import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { MailProvider } from 'src/app/providers/MailProvider';

@Component({
  selector: 'contacts-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactsComponent {

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      validateEmail,
    ]),
    phone: new FormControl('', [
      Validators.pattern("^((\\+359)|(359)|(00359)|0)?((89)|(98)|(88)|87)[0-9]{7}$")
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ])
  });

  @ViewChild("formDirective") formDirective!: FormGroupDirective;

  submitted = false;
  loading = false;

  constructor(
    private change: ChangeDetectorRef,
    private mailProvider: MailProvider
  ) { }

  onSubmit() { 
    this.submitted = true;
    this.change.markForCheck();
    if(this.form.valid){
      this.loading = true;
      this.change.markForCheck();
      this.mailProvider.post(this.form.value).subscribe((data) => {

        if(data?.result){
          this.submitted = false;
          this.formDirective.resetForm();
        }

        this.loading = false;
        this.change.markForCheck();
      });
    }
  }

}
