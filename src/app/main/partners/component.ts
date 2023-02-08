import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerProvider } from '../providers';
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
  limit = 50;
  loaded = false;
  filters = [];
  filter = this.filters[0]
  page = 1;

  constructor(
    ActivatedRoute: ActivatedRoute,
    private PartnerProvider: PartnerProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
    private SEOProvider: SEOProvider
  ) {
    const { partners = [], types = []} = ActivatedRoute.snapshot.data.data;
    const { page = 1 } = ActivatedRoute.snapshot.queryParams;

    this.partners = partners;
    this.page = Number(page) + 1;
    this.skip = Number(page) * this.limit;
    this.filters = types;

    this.filters.unshift({
      id: null,
      type: 'Всички партньори'
    })

    if (partners.length < this.limit) {
      this.loaded = true;
    }

    this.SEOProvider.set({
      title: `ЗНАНИЕ+ | Обекти`,
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: `/partners`
    });

  }

  track(index, item) {
    return item.key;
  }

  onSort() {
    this.skip = 0;
    this.limit = 50;
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
        type: this.filter
      }).subscribe((data) => {

        this.page++;
        this.skip += this.limit;

        if (reset) {
          this.partners = data;
          this.loaded = false;
        } else {
          const arr = [...this.partners, ...data];
          this.partners = arr;
        }

        if (data.length < this.limit) {
          this.loaded = true;
        }

        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

}
