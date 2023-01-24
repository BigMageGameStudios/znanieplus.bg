import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { generateBarCode } from 'src/app/helpers/barCodeGenerator';
import { LOCAL_STORAGE } from 'src/app/modules/local-storage';
import { MapProvider, SEOProvider } from 'src/app/providers';

@Component({
  selector: 'profile-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent {

  img: string;
  token: string;

  constructor(
    private router: Router,
    private SEOProvider: SEOProvider,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    this.SEOProvider.set({
      title: 'Знание плюс | Профил',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/logo.png',
      canonicalURL: '/profile'
    });
    this.img = generateBarCode("9732001668316", 16, 90);
    this.token = this.localStorage.getItem(MapProvider.USER);
  }

  exit (){
    this.localStorage.removeItem(MapProvider.USER);
    this.router.navigateByUrl('/');
  }

}
