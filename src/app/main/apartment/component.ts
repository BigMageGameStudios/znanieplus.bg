import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Types, Environment, ApartmentTypes } from 'src/globals/config';
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

  apartment: Apartment;
  templates = Types;
  api_url = Environment.api_url;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private MatDialog: MatDialog,
    private SEOProvider: SEOProvider
  ) {
    const { apartment } = ActivatedRoute.snapshot.data;
    this.apartment = apartment;

    this.SEOProvider.set({
      title: `Квадратен метър - ${apartment.getApartmentType().name}, адрес: ${apartment.address}, ${apartment.city}, тип: ${apartment.type}, цена: ${apartment.price} ${apartment.getCurrency().name}`,
      description: `${apartment.getApartmentType().name}, адрес: ${apartment.address}, ${apartment.city}, тип: ${apartment.type}, цена: ${apartment.price} ${apartment.getCurrency().name}.`,
      keywords: `агенция,недвижими имоти,${apartment.address},${apartment.city},${apartment.getApartmentType().name}`,
      ogUrl: `https://www.kvadratenmetar.bg/apartment/${apartment.key}`,
      ogType: 'article',
      ogDescription: `${apartment.getApartmentType().name}, адрес: ${apartment.address}, ${apartment.city}, тип: ${apartment.type}, цена: ${apartment.price} ${apartment.getCurrency().name}.`,
      ogImage: `${this.api_url}/min_uploads/images/${apartment.photos[apartment.cover].name}`,
      canonicalURL: `/apartment/${apartment.key}`
    });

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
