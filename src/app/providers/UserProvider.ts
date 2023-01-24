import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { IObjectKeys } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})

export class UserProvider {

    private cookies: IObjectKeys = {};

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Optional() @Inject('REQUEST') private req: any,
    ) { }

    init() {

        if (isPlatformServer(this.platformId)) {
            const c = this.req.cookie;
            this.cookies.language = c ? this.req.cookie.language || 'EN' : 'EN';
        }

        if (isPlatformBrowser(this.platformId)) {
            const cookies = document.cookie;
            this.parseCookie(cookies);
        }

    }

    private parseCookie(cookies: string) {
        if (cookies) {

            cookies = cookies.replace(/ /g, '');

            cookies.split(';').forEach((e) => {
                let item = e.split('=');
                this.cookies[item[0]] = item[1];
            });

        }
    }

    private setCookie({ key, value }) {

        this.cookies[key] = value;

        if (isPlatformBrowser(this.platformId)) {
            const expire = new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000);
            document.cookie = `${key}=${value}; expires=${expire}; path=/`;
        }
    }

    get(key: string) {
        return this.cookies[key];
    }
}