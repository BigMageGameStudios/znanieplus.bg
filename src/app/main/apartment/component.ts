import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Types, Environment, ApartmentTypes } from 'src/globals';
import { GalleryDialog } from 'src/app/shared/gallery-dialog';
import { Apartment } from 'src/app/models/apartment';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'apartment-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApartmentComponent {

  apartment: any;
  templates = Types;
  api_url = Environment.api_url;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private MatDialog: MatDialog,
    private SEOProvider: SEOProvider
  ) {
    const { apartment } = ActivatedRoute.snapshot.data;
    console.log(apartment)
    this.apartment = apartment;

  }

  getAllLink() {
    switch (this.apartment.apartmentType) {
      case (ApartmentTypes.rent.id): {
        return '/rent';
      }
      case (ApartmentTypes.sale.id): {
        return '/sale';
      }
    }
  }

  openGallery() {
    this.MatDialog.open(GalleryDialog, {
      panelClass: 'gallery',
      backdropClass: 'black',
      autoFocus: false,
      data: {
        cover: this.apartment.cover,
        photos: this.apartment.photos
      }
    });
  }

}
