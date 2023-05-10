import { Injectable } from '@angular/core';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';

@Injectable({
    providedIn: MainProvidersModule
})

export class NewsProvider {

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get() {
        return this.ApiProvider.get(`all_news`);
    }

    getMedia() {
        return this.ApiProvider.get(`homepage_news`);
    }

}
