import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserPositions, UserRoles, FileTypes } from 'src/globals/config';
import { switchMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

import { passwordMatchValidator } from '../../../utilities/validator';
import { UserProvider, FileProvider } from '../../providers';
import { Environment } from 'src/globals/config';

@Component({
  selector: 'user-dialog',
  templateUrl: './index.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserDialog {

  profilePicture;

  isSubmit = false;
  errors: any = {};
  edit = false;
  api_url = Environment.api_url;

  positions = UserPositions;
  roles = UserRoles;

  form = new FormGroup({
    position: new FormControl(UserPositions.broker.id, [
      Validators.required,
    ]),
    role: new FormControl(UserRoles.user.id, [
      Validators.required,
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.email,
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
    private MatDialogRef: MatDialogRef<UserDialog>,
    private ChangeDetectorRef: ChangeDetectorRef,
    private UserProvider: UserProvider,
    private FileProvider: FileProvider,
    @Inject(MAT_DIALOG_DATA) private data
  ) {

    const { user } = this.data;

    if (user) {
      this.edit = true;
      this.profilePicture = user.profilePicture;
      this.form = new FormGroup({
        position: new FormControl(user.position, [
          Validators.required,
        ]),
        role: new FormControl(user.role, [
          Validators.required,
        ]),
        firstname: new FormControl(user.firstname, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        lastname: new FormControl(user.lastname, [
          Validators.required,
          Validators.maxLength(255)
        ]),
        phone: new FormControl(user.phone, [
          Validators.required,
          Validators.maxLength(255),
        ]),
        email: new FormControl(user.email, [
          Validators.required,
          Validators.maxLength(255),
          Validators.email,
        ])
      });
    }

  }

  addProfilePicture() {
    let input: any = document.createElement('input');

    input.type = 'file';
    input.multiple = false;
    input.onchange = this.handleFile.bind(this);

    input.click();
    input.remove();

  }

  handleFile(event: any) {
    let files: File = event.target.files;

    if (files) {

      let fs = Object.keys(files);

      fs.forEach((o) => {
        let file = files[o];

        if (this.getFileType(file) == FileTypes.image.type) {
          file.blobUrl = window.URL.createObjectURL(file)
          this.profilePicture = file;
          this.ChangeDetectorRef.markForCheck();
        }
      });

    }
  }

  getFileType(file) {

    let keys = Object.keys(FileTypes);

    for (let i = 0; i < keys.length; i++) {

      let types = FileTypes[keys[i]].suportedTypes;
      let maxSize = FileTypes[keys[i]].maxSize;

      if (file.size > maxSize) {
        return -2;
      }

      for (let j = 0; j < types.length; j++) {
        if (types[j] == file.type) {
          return FileTypes[keys[i]].type;
        }
      }

    }

    return -1;

  }

  getProfilepicture() {
    if (this.profilePicture instanceof File) {
      return this.profilePicture['blobUrl'];
    } else {
      return `${this.api_url}/min_uploads/images/${this.profilePicture.name}`;
    }
  }


  submit() {
    if (this.edit) {
      return this.editUser();
    }
    return this.createUser();
  }

  editUser() {
    if (this.form.valid) {

      const update = {};
      const join = [];
      const { user } = this.data;
      const values = this.form.value;

      for (let key in values) {
        if (values[key] !== user[key]) {
          update[key] = values[key];
        }
      }

      join.push(this.UserProvider.put(user._id, update));

      if (this.profilePicture instanceof File) {
        const form: FormData = new FormData();
        form.append('profilePicture', this.profilePicture, this.profilePicture.name);
        join.push(this.FileProvider.uploadProfilePicture(form, user._id));
      }

      forkJoin(join).subscribe(([data]: any) => {
        if (data.errors) {
          this.errors = data.errors;
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

  createUser() {
    if (this.form.valid && this.profilePicture) {
      this.isSubmit = true;
      this.UserProvider.post(this.form.value).pipe(switchMap(({ result, errors }) => {

        if (errors) {
          this.errors = errors;
          this.isSubmit = false;
          Object.keys(this.errors).forEach((e: string) => {
            this.form.controls[e].setErrors({ 'incorrect': true });
          });
          return of(false);
        };

        const form: FormData = new FormData();
        form.append('profilePicture', this.profilePicture, this.profilePicture.name);
        return this.FileProvider.uploadProfilePicture(form, result._id);

      })).subscribe((data) => {
        if (data) {
          this.MatDialogRef.close();
        }
        this.ChangeDetectorRef.markForCheck();
      });
    }
  }


}
