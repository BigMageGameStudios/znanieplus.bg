import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';
import { Sort } from 'src/globals';

@Injectable({
    providedIn: MainProvidersModule
})

export class PartnerProvider {

    private mpath = 'places';
    private fpath = 'filtered'
    private ppath = 'place_data';

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

    getList({ skip = 0, limit = 20, type = Sort.price.id, sort = null }) {
        console.log(`${this.fpath}/${skip}/${limit}/${type}`)
        return this.ApiProvider.get(`${this.fpath}/${skip}/${limit}/${type}`)
            .pipe(map((result: any) => {
                if (result.errors) {
                    return [];
                }
                return result.data.data;
            }));
    }


    getByKey(key) {
        return this.ApiProvider.get(`${this.ppath}/${key}`)
            .pipe(map((data: any) => {
                if (data.errors) {
                    return null;
                }
                return data.data;
            }));
    }

}
