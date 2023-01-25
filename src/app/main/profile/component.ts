import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generateBarCode } from 'src/app/helpers/barCodeGenerator';
import { IObjectKeys } from 'src/app/helpers/interfaces';
import { trackByIndex } from 'src/app/helpers/track';
import { SEOProvider, UserProvider } from 'src/app/providers';

@Component({
  selector: 'profile-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent {

  img: string;
  token: string;

  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  codes: IObjectKeys[];

  constructor(
    private router: Router,
    private SEOProvider: SEOProvider,
    private userProvider: UserProvider,
    private activatedRoute: ActivatedRoute
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
    this.token = this.userProvider.getCode();
    this.img = generateBarCode(this.token, 14, 90);
    this.codes = this.activatedRoute.snapshot.data.codes;
    console.log(this.codes)
  }

  exit (){
    this.userProvider.exit();
    this.router.navigateByUrl('/');
  }

  trackByIndex = trackByIndex;

}
