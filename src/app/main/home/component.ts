import { Component, ChangeDetectionStrategy, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WINDOW } from 'src/app/modules/window';
import { SEOProvider } from 'src/app/providers';
import { Environment } from 'src/globals';

@Component({
  selector: 'home-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent{

  dialogs = {
    offer: 'offer'
  }
  activatedRoute = inject(ActivatedRoute);

  private SEOProvider= inject(SEOProvider);
  private ActivatedRoute= inject(ActivatedRoute);
  private window: Window = inject(WINDOW);
  @Input() media: any;
  client_url = Environment.client_url;

  items: any[];
  companies: any[];
  isMobile = this.window?.screen?.width < 800;

  constructor() {
    const [partners, companies] = this.ActivatedRoute.snapshot.data.result;
    this.companies = companies;
    const items = partners.data.data;
    this.items = items;
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'знание,карта,отстъпка,култура,социална придобивка,znanieplus,знание плюс,знаниеплюс,znanie plus,znanie+,знание+',
      ogUrl: 'https://www.znanieplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.znanieplus.bg/assets/images/FB_Znanie+_2000x2000_09.jpg',
      canonicalURL: '/'
    });

  }

}
