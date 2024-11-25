import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';

@Injectable({
    providedIn: MainProvidersModule
})

export class PartnerProvider {

    private mpath = 'places';
    private fpath = 'filtered'
    private ppath = 'place_data';
    private place_types = 'place_types';
    private cities = 'get_cities';

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

    getList({ skip = 0, limit = 300, type = null, online = null, city = null }) {
        return this.ApiProvider.get(`${this.fpath}/${skip}/${limit}/${type}/${online}/${city}`)
            .pipe(map((result: any) => {
                if (result.errors) {
                    return [];
                }
                return result.data.data;
            }));
    }

    getTypes() {
        return this.ApiProvider.get(`${this.place_types}`)
            .pipe(map((result: any) => {
                if (result.errors) {
                    return [];
                }
                return result.data;
            }));
    }

    getCities() {
        return this.ApiProvider.get(`${this.cities}`)
            .pipe(map((result: any) => {
                if (result.errors) {
                    return [];
                }
                return result.data;
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
