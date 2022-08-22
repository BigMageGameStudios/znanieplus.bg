import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileTypes, Cities } from 'src/globals/config';
import { switchMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

import { FileProvider, ApartmentProvider } from '../../providers';
import { Environment } from 'src/globals/config';
import { Currency, ApartmentTypes } from 'src/globals/config';

@Component({
    selector: 'apartment-dialog',
    templateUrl: './index.html',
    styleUrls: ['./style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApartmentDialog {

    isSubmit = false;
    errors: any = {};
    photos = [];
    removedPhotos = [];
    edit = false;
    api_url = Environment.api_url;
    currency = Currency
    cover = 0;
    cities = Cities;
    apartmentTypes = ApartmentTypes;

    form = new FormGroup({
        city: new FormControl('', [
            Validators.required,
        ]),
        apartmentType: new FormControl(ApartmentTypes.sale.id, [
            Validators.required,
        ]),
        address: new FormControl('', [
            Validators.required,
            Validators.maxLength(1000)
        ]),
        floor: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        type: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        construction: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        year: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        quadrature: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        price: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        m2price: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        currency: new FormControl(Currency.euro.id, [
            Validators.required,
            Validators.maxLength(255)
        ]),
        ownerName: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        ownerPhone: new FormControl('', [
            Validators.required,
            Validators.maxLength(255)
        ]),
        ownerEmail: new FormControl('', [
            Validators.email,
            Validators.required,
            Validators.maxLength(255)
        ]),
        description: new FormControl('', [
            Validators.required,
            Validators.maxLength(4096)
        ]),
        act16: new FormControl(true, [
            Validators.required,
        ])
    });

    constructor(
        private MatDialogRef: MatDialogRef<ApartmentDialog>,
        private ChangeDetectorRef: ChangeDetectorRef,
        private ApartmentProvider: ApartmentProvider,
        private FileProvider: FileProvider,
        @Inject(MAT_DIALOG_DATA) private data
    ) {

        const { apartment } = this.data;

        if (apartment) {
            this.edit = true;
            this.photos = [...apartment.photos];
            this.cover = apartment.cover;
            this.setValues(apartment);
        }

    }

    setValues(apartment) {
        const value = {};
        for (let key in this.form.controls) {
            value[key] = apartment[key];
        }
        this.form.setValue(value);
    }

    changeCover(index) {
        this.cover = index;
    }

    deletePhoto(index) {
        const photo = this.photos[index];
        this.cover = 0;
        if (!(photo instanceof File)) {
            this.removedPhotos.push(photo.name);
        }
        this.photos.splice(index, 1);
    }

    addPhotos() {
        let input: any = document.createElement('input');

        input.type = 'file';
        input.multiple = true;
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
                    this.photos.push(file);
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

    getPhoto(index) {
        const photo = this.photos[index];
        if (photo instanceof File) {
            return photo['blobUrl'];
        } else {
            return `${this.api_url}/min_uploads/images/${photo.name}`;
        }
    }

    close() {
        this.MatDialogRef.close();
    }

    submit() {
        if (this.edit) {
            return this.editApartment();
        }
        return this.createApartment();
    }

    editApartment() {
        if (this.form.valid && this.photos.length > 0) {

            const update = {};
            const join = [];
            const { apartment } = this.data;
            const newFiles = [];
            const values = this.form.value;

            values.cover = this.cover;
            this.isSubmit = true;

            for (let key in values) {
                if (values[key] !== apartment[key]) {
                    update[key] = values[key];
                }
            }

            join.push(this.ApartmentProvider.put(apartment._id, update));

            if (this.removedPhotos.length > 0) {
                join.push(this.ApartmentProvider.putPhotos(apartment._id, this.removedPhotos));
            }

            this.photos.forEach((item) => {
                if (item instanceof File) {
                    newFiles.push(item);
                }
            });

            if (newFiles.length > 0) {
                const photoForm: FormData = new FormData();

                newFiles.forEach((photo) => {
                    photoForm.append('photos[]', photo, photo.name);
                });

                join.push(this.FileProvider.uploadPhotos(photoForm, apartment._id));
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

    createApartment() {
        if (this.form.valid && this.photos.length > 0) {
            this.isSubmit = true;
            const value = this.form.value;
            value.cover = this.cover;
            this.ApartmentProvider.post(this.form.value).pipe(switchMap(({ result, errors }) => {

                if (errors) {
                    this.errors = errors;
                    this.isSubmit = false;
                    Object.keys(this.errors).forEach((e: string) => {
                        this.form.controls[e].setErrors({ 'incorrect': true });
                    });
                    return of(false);
                };

                const photoForm: FormData = new FormData();

                this.photos.forEach((photo) => {
                    photoForm.append('photos[]', photo, photo.name);
                });

                return this.FileProvider.uploadPhotos(photoForm, result._id);

            })).subscribe((data) => {
                if (data) {
                    this.MatDialogRef.close();
                }
                this.ChangeDetectorRef.markForCheck();
            });
        }
    }


}
