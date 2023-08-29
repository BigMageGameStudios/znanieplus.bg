import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyProvider } from '../providers';
import { SEOProvider } from 'src/app/providers';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Component({
  selector: 'companies-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompaniesComponent {

  companies: IObjectKeys[] = [];

  skip = 0;
  limit = 300;
  loaded = false;
  online = false;
  page = 1;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private CompanyProvider: CompanyProvider,
    private ChangeDetectorRef: ChangeDetectorRef,
    private Router: Router,
    private SEOProvider: SEOProvider,
  ) {

    const { companies = [], types = [], cities = []} = ActivatedRoute.snapshot.data.data;
    const { page = 1 } = ActivatedRoute.snapshot.queryParams;

    this.companies = companies;
    this.page = Number(page) + 1;
    this.skip = Number(page) * this.limit;

    if (companies.length < this.limit) {
      this.loaded = true;
    }

    this.SEOProvider.set({
      title: `ЗНАНИЕ+ | Компании`,
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg/companies',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: `/companies`
    });

  }

  track(index, item) {
    return item.key;
  }

  onSort() {
    this.skip = 0;
    this.limit = 300;
    this.page = 1;
    this.onLoadMore(true);
    this.Router.navigate([], {
      state: {
        disableScroll: true
      },
      replaceUrl: true,
      relativeTo: this.ActivatedRoute,
      queryParams: {
        page: 1,
      }
    });
  }

  onLoadMore(reset?) {
    if (!this.loaded || reset) {
      this.Router.navigate([], {
        state: {
          disableScroll: true
        },
        replaceUrl: true,
        relativeTo: this.ActivatedRoute,
        queryParams: {
          page: this.page,
        }
      });
      this.CompanyProvider.getList().subscribe((data) => {
        if (reset) {
          this.companies = data;
          this.loaded = false;
        } else {
          const arr = [...this.companies, ...data];
          this.companies = arr;
        }

        if (data.length < this.limit) {
          this.loaded = true;
        }

        this.ChangeDetectorRef.markForCheck();
      });
    }
  }

}
