import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, inject, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { validateEmail } from 'src/app/helpers/emailValidator';
import { MailProvider } from 'src/app/providers/MailProvider';
import { ConfirmDialog } from '../confirm-dialog';
import { ApiProvider } from 'src/app/providers';
import { WINDOW } from 'src/app/modules/window';

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
      Validators.required,
      Validators.pattern("^((\\+359)|(359)|(00359)|0)?((89)|(98)|(88)|87)[0-9]{7}$")
    ]),
    agreed: new FormControl('', [
      Validators.requiredTrue
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ])
  });

  @ViewChild("formDirective") formDirective!: FormGroupDirective;

  submitted = false;
  loading = false;

  window: Window = inject(WINDOW);

  constructor(
    private dialog: MatDialog,
    private change: ChangeDetectorRef,
    private mailProvider: MailProvider, 
    private apiProvider: ApiProvider
  ) { }

  onSubmit() { 
    this.submitted = true;
    this.change.markForCheck();
    if(this.form.valid){
      this.loading = true;
      this.showDialog();
      this.change.markForCheck();
      this.window?.fbq('track', 'Lead');


      this.mailProvider.post(this.form.value).subscribe((data) => {

        if(data?.result){
          this.submitted = false;
          this.formDirective.resetForm();
        }

        this.loading = false;
        this.change.markForCheck();
      });

      this.apiProvider.post('contacts-message', {
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        text: this.form.value.message
      }).subscribe((data) => {});
    
    }
  }

  showDialog() {
    this.dialog.open(ConfirmDialog, {
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        title: 'Внимание',
        message: 'Съобщението е изпратено успешно!',
        buttons: [
          {
            label: 'Добре',
          }
        ]
      }
    });
  }

}
