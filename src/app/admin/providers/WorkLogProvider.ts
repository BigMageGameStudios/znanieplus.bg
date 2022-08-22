import { Injectable } from '@angular/core';

import { ApiProvider } from 'src/app/providers';
import { Observable } from 'rxjs';
import { AdminProvidersModule } from './module';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: AdminProvidersModule
})

export class WorkLogProvider {

    private path = 'worklog';
    private mpath = 'worklogs';

    constructor(
        private ApiProvider: ApiProvider
    ) { }

    get({ skip = 0, limit = 20 }) {
        let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());
        return this.ApiProvider.get(`${this.mpath}?${params.toString()}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return [];
                }
                return data.result;
            }));
    }

    getAdmin({ skip = 0, limit = 20, userId }) {
        let params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());
        return this.ApiProvider.get(`${this.mpath}/admin/${userId}?${params.toString()}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return [];
                }
                return data.result;
            }));
    }

    post(data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.post(`${this.path}`, data);
    }

    put(worklogId, data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.put(`${this.path}`, {
            worklogId,
            data
        });
    }

}
