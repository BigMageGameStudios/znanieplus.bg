import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { track } from 'src/app/helpers/track';
import { SEOProvider } from 'src/app/providers';
import { Environment } from 'src/globals';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateEmail} from "../../helpers/emailValidator";
import {ActivatedRoute} from "@angular/router";
import {StripeProvider} from "../providers/StripeProvider";
import {loadStripe, Stripe, StripeElements} from '@stripe/stripe-js';

type StripePrice = {
  nickname: string,
  currency: string,
  id: string,
  unit_amount: number
}


@Component({
  selector: 'subscription-success-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubscriptionSuccessComponent{

  api_url = Environment.api_url;
  track = track;

  constructor(
    private SEOProvider: SEOProvider,
  ) {
    this.SEOProvider.set({
      title: 'ЗНАНИЕ+',
      description: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      keywords: 'ЗНАНИЕ,карта,отстъпка,култура,социална придобивка,znanieplus,ЗНАНИЕ плюс,ЗНАНИЕплюс,znanie plus,znanie+,ЗНАНИЕ+',
      ogUrl: 'https://www.zdraveplus.bg',
      ogType: 'article',
      ogDescription: 'ЗНАНИЕ+ е първата социална придобивка в България, която дава възможност на работодателя да подпомогне културното обогатяване на своите служители чрез фиксиран месечен или годишен абонамент на разумна цена.',
      ogImage: 'https://www.zdraveplus.bg/assets/images/logo.png',
      canonicalURL: '/'
    });

  }
}
