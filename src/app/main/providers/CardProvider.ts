import { Injectable } from '@angular/core';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';

@Injectable({
    providedIn: MainProvidersModule
})

export class CardProvider {

    private mpath = 'active_cards';
    private lpath = 'login';
    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get(card: string) {
        return this.ApiProvider.get(`${this.mpath}/${card}`);
    }

    login(card: string, email: string) {
        return this.ApiProvider.get(`${this.lpath}/${card}/${email}`);
    }

}
