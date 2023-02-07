import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerProvider } from '../providers';
import { Sort, PartnerTypes } from 'src/globals';
import { SEOProvider } from 'src/app/providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'partners-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PartnersComponent {

  partners: IObjectKeys[] = [];

  skip = 10;
  limit = 10;
  loaded = false;
  sortTypes = Sort;
  sort = Sort.price.id
  page = 1;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private PartnerProvider: PartnerProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
    private SEOProvider: SEOProvider
  ) {
    const { partners = []} = ActivatedRoute.snapshot.data;
    const { page = 1 } = ActivatedRoute.snapshot.queryParams;

    this.partners = partners;
    this.page = Number(page) + 1;
    this.skip = Number(page) * this.limit;
    if (partners.length < this.limit) {
      this.loaded = true;
    }

    this.SEOProvider.set({
      title: `Знание плюс | Обекти`,
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: `/partners`
    });

  }

  track(index, apartment) {
    return apartment.key;
  }

  onSort() {
    this.skip = 0;
    this.limit = 10;
    this.page = 1;
    this.onLoadMore(true);
    this.Router.navigate(['/partners'], {
      queryParams: {
        page: 1,
      }
    });
  }

  onLoadMore(reset?) {
    if (!this.loaded || reset) {
      this.PartnerProvider.getList({
        skip: this.skip,
        limit: this.limit,
        type: PartnerTypes.rent.id,
        sort: this.sort
      }).subscribe((result: any) => {

        this.page++;
        this.skip += this.limit;

        if (reset) {
          this.partners = result.data.data;
          this.loaded = false;
        } else {
          const arr = [...this.partners, ...result.data.data];
          this.partners = arr;
        }

        if (result.data.data.length < this.limit) {
          this.loaded = true;
        }

        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

}
