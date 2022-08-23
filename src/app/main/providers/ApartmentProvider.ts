import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';
import { Apartment } from 'src/app/models/apartment';
import { Sort } from 'src/globals';

@Injectable({
    providedIn: MainProvidersModule
})

export class ApartmentProvider {

    private path = 'apartment';
    private mpath = 'apartments';

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get({ skip = 0, limit = 20, apartmentType = null, sort = Sort.price.id }) {

        let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());

        if (apartmentType) {
            params = params.append('apartmentType', apartmentType);
        }

        if (sort) {
            params = params.append('sort', sort.toString());
        }

        return this.ApiProvider.get(`${this.mpath}/clients?${params.toString()}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return [];
                }
                return data.result.map((item) => {
                    return new Apartment(item);
                });
            }));
    }

    getByKey(key) {
        return this.ApiProvider.get(`${this.path}/clients/${key}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return null;
                }
                const apartment = data.result;
                apartment.similar = apartment.similar.map((item) => {
                    return new Apartment(item);
                })
                return new Apartment(apartment);
            }));
    }

}
