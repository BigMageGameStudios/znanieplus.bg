import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
      Validators.email,
    ]),
    phone: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ])
  });

  constructor() { }

  onSubmit() { }

}
