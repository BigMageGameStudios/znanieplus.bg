import { Injectable } from '@angular/core';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';

@Injectable({
    providedIn: MainProvidersModule
})

export class PromoProvider {

    private mpath = 'promo_codes';

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get(card: string) {
        return this.ApiProvider.get(`${this.mpath}/${card}`);
    }

}
