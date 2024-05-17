import { Injectable, Inject, signal } from '@angular/core';
import { LOCAL_STORAGE } from '../modules/local-storage';
import { ApiProvider } from './ApiProvider';
import { firstValueFrom } from 'rxjs';
import { IObjectKeys } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})

export class UserProvider {

    static readonly key = 'user';
    static readonly policy = 'policy';
    user = signal<any>(null);

    constructor(
        private ApiProvider: ApiProvider,
        @Inject(LOCAL_STORAGE) private localStorage: Storage,
    ) { }

    async init() { 
        const card = this.getCode();
        return firstValueFrom(this.ApiProvider.get(`active_cards/${card}`)).then((item: { active: boolean, first_name: string, last_name: string, isAdmin: number}) => {
            this.user.set(item);
        });
    }

    exit() {
        this.deleteCookie(UserProvider.key);
        this.user.set({} as IObjectKeys);
    }

    login(value: string) {
        this.setData({ key: UserProvider.key, value });
        this.init();
    }

    acceptPolicy() {
        this.setData({ key: UserProvider.policy, value: true });

    }

    isLogedIn() {
        return this.localStorage.getItem(UserProvider.key)!;
    }

    getCode() {
        return this.localStorage.getItem(UserProvider.key);
    }

    getPolicy() {
        return this.localStorage.getItem(UserProvider.policy);
    }

    private setData({ key, value }) {
        this.localStorage.setItem(key, value);
    }

    private deleteCookie(key: string) {
        this.localStorage.removeItem(key);

    }

}