import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformServer, isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class UserProvider {

    static readonly key = 'user';
    readonly time = 365 * 2 * 24 * 60 * 60 * 1000;

    private cookies = new Map();

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object,
        @Optional() @Inject('REQUEST') private req: any,
    ) { }

    init() {

        if (isPlatformServer(this.platformId)) {
            this.cookies.set(UserProvider, this.req?.cookie?.user);
        }

        if (isPlatformBrowser(this.platformId)) {
            const cookies = this.document.cookie;
            this.parseCookie(cookies);
        }

    }

    private parseCookie(cookies: string) {
        if (cookies) {
            cookies = cookies.replace(/ /g, '');

            cookies.split(';').forEach((e) => {
                let item = e.split('=');
                this.cookies.set(item[0], item[1]);
            });

        }
    }

    exit() {
        this.deleteCookie(UserProvider.key);
    }

    login(value: string) {
        this.setCookie({ key: UserProvider.key, value });
    }

    isLogedIn(){
        return this.cookies.get(UserProvider.key)!;
    }
    
    getCode(){
        return this.cookies.get(UserProvider.key);
    }

    private setCookie({ key, value }) {

        this.cookies.set(key, value);

        if (isPlatformBrowser(this.platformId)) {
            const expire = new Date(Date.now() + this.time);
            this.document.cookie = `${key}=${value}; expires=${expire}; path=/`;
        }
    }

    private deleteCookie(key: string) {
        if (isPlatformBrowser(this.platformId)) {
            this.document.cookie = `${key}=; expires=${new Date(0)}; path=/`;
            this.cookies.delete(key);
        }
    }

}