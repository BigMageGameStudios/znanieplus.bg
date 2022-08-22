import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiProvider, MapProvider } from 'src/app/providers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { AdminProvidersModule } from './module';

@Injectable({
    providedIn: AdminProvidersModule
})

export class UserProvider {

    private path = 'user';
    private mpath = 'users';

    constructor(
        private ApiProvider: ApiProvider,
        private MapProvider: MapProvider,
    ) { }

    get({ skip = 0, limit = 20 }) {
        const params = new HttpParams().append('skip', skip.toString()).append('limit', limit.toString());
        return this.ApiProvider.get(`${this.mpath}?${params.toString()}`)
            .pipe(map((data: { result, errors }) => {
                if (data.errors) {
                    return [];
                }
                return data.result.map((item) => {
                    return new User(item);
                });
            }));
    }

    getAuth(): Observable<{ result, error }> {
        return <Observable<{ result, error }>>this.ApiProvider
            .get(`${this.path}/authenticate`)
            .pipe(map((data: { result, error }) => {

                const { result, error } = data;

                if (result) {
                    this.MapProvider.set(this.MapProvider.USER, result);
                }

                return data;

            }));
    }


    postAuthenticate({
        email,
        password
    }): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.post(`${this.path}/authenticate`, {
            email,
            password
        }).pipe(map((data: { result, errors }) => {
            const { result } = data;
            if (result) {
                this.MapProvider.set(this.MapProvider.USER, result);
            }
            return data;
        }));
    }

    post({
        firstname,
        lastname,
        phone,
        email,
        password,
        role,
        position
    }): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.post(`${this.path}`, {
            firstname,
            lastname,
            phone,
            email,
            password,
            role,
            position
        });
    }

    put(userId, data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.put(`${this.path}`, {
            userId,
            data
        });
    }

    updatePassowrd(data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.put(`${this.path}/update-password`, { data });
    }

    resetPassword(data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.post(`${this.path}/reset-password`, data);
    }

    putResetPassword(data): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.put(`${this.path}/reset-password`, data);
    }

    logOut(): Observable<{ result, errors }> {
        return <Observable<{ result, errors }>>this.ApiProvider.get(`${this.path}/logout`);
    }

}
