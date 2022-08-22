import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiProvider } from 'src/app/providers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminProvidersModule } from './module';
import { Apartment } from 'src/app/models/apartment';

@Injectable({
    providedIn: AdminProvidersModule
})

export class ApartmentProvider {

    private path = 'apartment';
    private mpath = 'apartments';

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get({ skip = 0, limit = 20, own = false }) {
        let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());
        if (own) {
            params = params.append('own', own.toString());
        }
        return this.ApiProvider.get(`${this.mpath}?${params.toString()}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return [];
                }
                return data.result.map((item) => {
                    return new Apartment(item);
                });
            }));
    }

    post(data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.post(`${this.path}`, data);
    }

    put(apartmentId, data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.put(`${this.path}`, {
            apartmentId,
            data
        });
    }

    delete(apartmentId) {
        return this.ApiProvider.delete(`${this.path}/${apartmentId}`);
    }

    putPhotos(apartmentId, photos) {
        return <Observable<{ result, errors }>>this.ApiProvider.put(`${this.path}/update-photos`, {
            apartmentId,
            data: {
                photos
            }
        });
    }

}
