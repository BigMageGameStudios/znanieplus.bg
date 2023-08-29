import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ApiProvider } from 'src/app/providers';
import { MainProvidersModule } from './module';
import { IObjectKeys } from 'src/app/helpers/interfaces';

@Injectable({
    providedIn: MainProvidersModule
})

export class CompanyProvider {

    private mpath = 'companies';
    private fpath = 'companies'

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

    getList() {
        return this.ApiProvider.get(`${this.fpath}`)
            .pipe(map((result: any) => {
                if (result.errors) {
                    return [];
                }
                return result;
            }));
    }
}
