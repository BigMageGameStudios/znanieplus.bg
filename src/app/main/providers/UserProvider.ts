import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiProvider } from 'src/app/providers';
import { map } from 'rxjs/operators';
import { MainProvidersModule } from './module';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: MainProvidersModule
})

export class UserProvider {

    private path = 'user';
    private mpath = 'users';

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get({ skip = 0, limit = 20 }) {
        let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());
        return this.ApiProvider.get(`${this.mpath}/clients?${params.toString()}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return [];
                }
                return data.result.map((item) => {
                    return new User(item);
                });
            }));
    }

}
