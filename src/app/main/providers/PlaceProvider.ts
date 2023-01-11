import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';

@Injectable({
    providedIn: MainProvidersModule
})

export class PlaceProvider {

    private mpath = 'places';

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get({ page = 1 }) {

        let params = new HttpParams().append('page', page.toString());

        return this.ApiProvider.get(`${this.mpath}?${params.toString()}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return [];
                }
                return data;
            }));
    }

    getByKey(key) {
        return this.ApiProvider.get(`${this.mpath}/${key}`)
            .pipe(map((data: any) => {
                if (data.errors) {
                    return null;
                }
                return data.data;
            }));
    }

}
