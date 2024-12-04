import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainProvidersModule} from "./module";
import {map, Observable, Observer, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Environment} from '../../../globals';
import {ApiProvider} from "../../providers";
import {IObjectKeys} from "../../helpers/interfaces";

const STRIPE_BASE_URL = 'https://api.stripe.com/v1'
type CreateSubscription = {
  customer: string,
  price: string
}

type CustomerRequestData = {
  email: string,
  name: string,
  metadata: {
    company_name: string,
    company_id: number
  }
}


@Injectable({
  providedIn: MainProvidersModule
})
export class StripeProvider {
  Authorization: string

  constructor(
    private HttpClient: HttpClient,
    private Api: ApiProvider
  ) {
    this.Authorization = `Bearer ${Environment.stripe_secret_key}`
  }

  getCompanies() {
    return this.Api.get('firms').pipe(catchError(this.handleError));
  }

  createCustomer(data: CustomerRequestData) {
    return new Observable((observer: Observer<any>) => {
      this.getCustomer(data.email).subscribe(customer => {
        if (customer) {
          return observer.next(customer)
        } else {
          const formData = new URLSearchParams()
          formData.append('email', data.email);
          formData.append('name', data.name);
          formData.append('metadata[company_name]', data.metadata.company_name);
          formData.append('metadata[company_id]', data.metadata.company_id.toString());
          formData.append('metadata[platform]', Environment.stripe_metadata_platform);
          this.HttpClient.request('POST', `${STRIPE_BASE_URL}/customers`, {
            headers: {
              Authorization: this.Authorization,
              "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
          }).subscribe((response) => observer.next(response));
        }
      })
    })
  }


  createSubscription(data: CreateSubscription) {
    const formData = new URLSearchParams();
    formData.append('customer', data.customer);
    formData.append('items[][price]', data.price);
    formData.append('payment_behavior', 'default_incomplete');
    formData.append('payment_settings[save_default_payment_method]', 'on_subscription');
    formData.append('expand[]', 'latest_invoice.payment_intent');

    return this.HttpClient.request('POST', `${STRIPE_BASE_URL}/subscriptions`, {
      headers: {
        Authorization: this.Authorization,
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      body: formData.toString(),
    }).pipe(catchError(this.handleError));
  }

  getPrices() {
    return this.HttpClient.request('GET', `https://api.stripe.com/v1/prices?active=true&product=${Environment.stripe_product}`, {
      headers: {
        Authorization: this.Authorization,
      }
    }).pipe(catchError(this.handleError));
  }

  cancelSubscription (id: string) {
    return this.HttpClient.request('DELETE', `${STRIPE_BASE_URL}/subscriptions/${id}`, {
      headers: {
        Authorization: this.Authorization,
      },
    }).pipe(catchError(this.handleError));
  }

  getCustomer (email: string) {
    return this.HttpClient.request('GET', `https://api.stripe.com/v1/customers?limit=1&email=${email}`, {
      headers: {
        Authorization: this.Authorization,
      }
    }).pipe(map((response: IObjectKeys) => {
      if (response.data.length) {
        const customer = response.data[0]
        if (customer.metadata.platform === Environment.stripe_metadata_platform) {
          return response.data[0]
        }
        return null
      }
      return null
    }), catchError(this.handleError));
  }

  getSubscription(email: string) {

    return this.HttpClient.request('GET', `https://api.stripe.com/v1/customers?limit=1&email=${email}&expand[]=data.subscriptions`, {
      headers: {
        Authorization: this.Authorization,
      }
    }).pipe(map((response: IObjectKeys) => {
      if (response.data.length) {
        const customer = response.data[0]
        if (customer.subscriptions.data.length) {
          return customer?.subscriptions?.data?.[0] ?? null
        }
        return null
      }
      return null
    }), catchError(this.handleError));
  }

  private handleError(error) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(() => new Error(errMsg));
  }

}
