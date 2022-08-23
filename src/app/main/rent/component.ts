import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apartment } from 'src/app/models/apartment';
import { ApartmentProvider } from '../providers';
import { Sort, ApartmentTypes } from 'src/globals/config';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'rent-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RentComponent {

  apartments: Apartment[];

  skip = 12;
  limit = 12;
  loaded = false;
  sortTypes = Sort;
  sort = Sort.price.id
  page = 1;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private ApartmentProvider: ApartmentProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
    private SEOProvider: SEOProvider
  ) {
    const { apartments } = ActivatedRoute.snapshot.data;
    const { page = 1 } = ActivatedRoute.snapshot.queryParams;

    this.apartments = apartments;
    this.page = Number(page) + 1;
    this.skip = Number(page) * this.limit;
    if (apartments.length < this.limit) {
      this.loaded = true;
    }

    this.SEOProvider.set({
      title: 'Квадратен метър - Обяви за недвижи имоти под наем',
      description: 'Обяви за недвижи имоти под наем.',
      keywords: 'агенция,недвижими имоти,наем на имоти,наем',
      ogUrl: 'https://www.kvadratenmetar.bg/rent',
      ogType: 'article',
      ogDescription: 'Обяви за недвижи имоти под наем.',
      ogImage: 'https://www.kvadratenmetar.bg/assets/images/logo.png',
      canonicalURL: '/rent'
    });

  }

  track(index, apartment) {
    return apartment.key;
  }

  onSort() {
    this.skip = 0;
    this.limit = 12;
    this.page = 1;
    this.onLoadMore(true);
    this.Router.navigate(['/sale'], {
      queryParams: {
        page: 1
      }
    });
  }

  onLoadMore(reset?) {
    if (!this.loaded || reset) {
      this.ApartmentProvider.get({
        skip: this.skip,
        limit: this.limit,
        apartmentType: ApartmentTypes.rent.id,
        sort: this.sort
      }).subscribe((data) => {

        this.page++;
        this.skip += this.limit;

        if (reset) {
          this.apartments = data;
          this.loaded = false;
        } else {
          const arr = [...this.apartments, ...data];
          this.apartments = arr;
        }

        if (data.length < this.limit) {
          this.loaded = true;
        }

        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

}
