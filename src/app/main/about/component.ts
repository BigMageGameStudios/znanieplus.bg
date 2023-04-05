import { isPlatformBrowser } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject, ViewChild, ElementRef, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from 'src/app/modules/window';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'about-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AboutComponent implements OnInit{

  items: any[];

  constructor(
    private SEOProvider: SEOProvider,
    private ActivatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: '/'
    });

  }

  ngOnInit() {

  }

}