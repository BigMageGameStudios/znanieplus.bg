import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SEOProvider } from 'src/app/providers';

@Component({
  selector: 'petrol-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PetrolComponent {

  constructor(
    private SEOProvider: SEOProvider
  ) {
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg/cookies',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: '/cookies'
    });
  }

}
