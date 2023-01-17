import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'presentation-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PresentationComponent {

  constructor(
    private SEOProvider: SEOProvider
  ) {
    this.SEOProvider.set({
      title: 'Знание плюс',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: '/presentation'
    });
  }

}
