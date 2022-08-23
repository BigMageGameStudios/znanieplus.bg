import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'contacts-component',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactsComponent {

  form = new UntypedFormGroup({
    name: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
    ]),
    phone: new UntypedFormControl('', [
      Validators.required
    ]),
    message: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ])
  });

  constructor() { }

  onSubmit() { }

}
