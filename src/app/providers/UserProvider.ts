import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE } from '../modules/local-storage';

@Injectable({
    providedIn: 'root'
})

export class UserProvider {

    static readonly key = 'user';
    static readonly policy = 'policy';

    constructor(
        @Inject(LOCAL_STORAGE) private localStorage: Storage,
    ) { }

    init() { }

    exit() {
        this.deleteCookie(UserProvider.key);
    }

    login(value: string) {
        this.setData({ key: UserProvider.key, value });
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