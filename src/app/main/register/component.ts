import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { track } from 'src/app/helpers/track';
import { SEOProvider } from 'src/app/providers';
import { Environment } from 'src/globals';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {validateEmail} from "../../helpers/emailValidator";
import {ActivatedRoute} from "@angular/router";
import {StripeProvider} from "../providers/StripeProvider";
import {loadStripe, Stripe, StripeElements} from '@stripe/stripe-js';
import {IObjectKeys} from "../../helpers/interfaces";

type StripePrice = {
  nickname: string,
  currency: string,
  id: string,
  unit_amount: number
}

type CompanyData = {
  id: number,
  name: string,
}

type StripeDataResponse = {subscriptionId: string, clientSecret: string}

@Component({
  selector: 'register-page',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegisterComponent{

  api_url = Environment.api_url;
  stripe_key = Environment.stripe_key
  stripe_redirect_url = Environment.stripeReturnURL
  track = track;
  prices: StripePrice[]
  companies: CompanyData[]
  paymentReady: boolean =  false;
  elements: StripeElements
  stripeAPI: Stripe
  busy: boolean = false;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      validateEmail
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    company: new FormControl<CompanyData>(null, [Validators.required]),
    price: new FormControl<StripePrice>(null, [Validators.required])
  });

  constructor(
    private SEOProvider: SEOProvider,
    private stripe: StripeProvider,
    private ActivatedRoute: ActivatedRoute,
    private ChangeDetectorRef: ChangeDetectorRef,
  ) {

    const {prices, companies} = ActivatedRoute.snapshot.data.data
    this.companies = companies;
    this.prices = prices;
    this.form.setValue({firstName: '', lastName: '', email: '', company: companies[0], price: prices[0]})

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

  onSubmit () {
    if (this.form.valid) {
      const {email, firstName, lastName, company, price} = this.form.value
      this.busy = true
      console.log(company)
      this.stripe.createCustomer({
        email,
        name: `${firstName} ${lastName}`,
        metadata: {
          company_name: company.name,
          company_id: company.id
        }
      }).subscribe((result: IObjectKeys) => {
        this.stripe.createSubscription({
          price: this.form.value.price.id,
          customer: result.id
        }).subscribe((subscription: IObjectKeys) => {
            this.paymentReady = true
            this.ChangeDetectorRef.markForCheck()

            const paymentFormData = {
              subscriptionId: subscription.id,
              clientSecret: subscription.latest_invoice.payment_intent.client_secret
            }

            this.addStripePaymentForm(paymentFormData).then(() => {})
        })
      })
    }
  }

  async onStripePayment () {
    this.busy = true
    const {error} = await this.stripeAPI.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements: this.elements,
      confirmParams: {
        return_url: this.stripe_redirect_url,
        payment_method_data: {
          billing_details: {
            address: {
              country: 'BG',
              postal_code: '',
              state: '',
              city: '',
              line1: '',
              line2: '',
            }
          }
        }
      }
    });

    if (error) {
      document.getElementById('error-message').innerText = error.message
    }

    this.busy = false
    this.ChangeDetectorRef.markForCheck()

  }

  async addStripePaymentForm (data: StripeDataResponse) {
    this.stripeAPI = await loadStripe(this.stripe_key, {locale: 'bg'})
    const options = {
      clientSecret: data.clientSecret,
      appearance: {},
    };
    this.elements = this.stripeAPI.elements(options);
    const paymentElement = this.elements.create('payment', {
      layout: "tabs",
      fields: {billingDetails: {address: "never"}}
    });
    paymentElement.mount('#payment-element');
    paymentElement.on("ready", () => {
      this.busy = false
      this.ChangeDetectorRef.markForCheck()
    })
  }
}
