import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title, } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { WINDOW } from '../modules/window';
import { IObjectKeys } from '../helpers/interfaces';
import { Environment } from 'src/globals/config';

@Injectable({
    providedIn: 'root'
})

export class SEOProvider {

    canonicalURL: HTMLLinkElement | null;
    noscript: HTMLElement | null;
    ldjson: HTMLElement | null;
    itemscope: HTMLElement | null;

    fbqLoaded = false;
    enabled = true;

    pixelQueue: IObjectKeys[] = [];
    descriptionRegEx = new RegExp('<[^>]*>', 'g');
    googleID = 'G-P0YK5C7N5R';
    pixelId = `977265799913171`;
    url = Environment.client_url;

    constructor(
        private Meta: Meta,
        private Title: Title,
        private Router: Router,
        @Inject(DOCUMENT) private document: Document,
        @Inject(WINDOW) private window: IObjectKeys,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {

        this.noscript = this.document.getElementById('facebook_pixel');
        this.canonicalURL = this.document.querySelector("link[rel='canonical']");
        this.ldjson = this.document.getElementById('ldjson');
        this.itemscope = this.document.querySelector("div[itemscope]");

        this.setNoScript();

        if ((isPlatformBrowser(platformId) && environment.production && this.enabled)) {

            const isBot = (navigator && navigator.userAgent) ? /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|Lighthouse/i.test(navigator.userAgent) : true;
            if (!isBot) {
                this.onLoadGTAG();
                this.onLoadPixel(this.window, this.document, 'script', '//connect.facebook.net/en_US/fbevents.js');
            }

        }
    }

    set({
        title,
        description,
        keywords,
        canonicalURL,
        ogUrl,
        ogType,
        ogDescription,
        ogImage
    }: {
        title: string,
        description: string,
        keywords: string,
        canonicalURL: string,
        ogUrl: string,
        ogType: string,
        ogDescription: string,
        ogImage: string
    }) {

        this.Meta.updateTag({
            content: description.replace(this.descriptionRegEx, '') ?? ''
        },
            "property='description'"
        );
        this.Meta.updateTag({
            content: keywords ?? ''
        },
            "property='keywords'"
        );
        this.Meta.updateTag({
            content: ogUrl ?? ''
        },
            "property='og:url'"
        );
        this.Meta.updateTag({
            content: ogType ?? ''
        },
            "property='og:type'"
        );
        this.Meta.updateTag({
            content: title ?? ''
        },
            "property='og:title'"
        );
        this.Meta.updateTag({
            content: ogDescription.replace(this.descriptionRegEx, '') ?? ''
        },
            "property='og:description'"
        );
        this.Meta.updateTag({
            content: ogImage ?? ''
        },
            "property='og:image'"
        );
        this.Title.setTitle(title ?? '');
        this.setCanonicalURL(canonicalURL);
        this.setNoScript();
        this.setPixelEvent();

    }

    setCanonicalURL(url: string) {
        this.canonicalURL?.setAttribute('href', `${this.url}${url}`);
    }

    setNoScript() {
        if (this.noscript) {
            this.noscript.innerHTML = `Please enable JavaScript to continue using this application.
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${this.pixelId}&ev=PageView&noscript=1" />
            <iframe src="https://www.googletagmanager.com/ns.html?id=${this.googleID}" height="0" width="0"
             style="display:none;visibility:hidden"></iframe>`;
        }

    }

    setPixelEvent() {
        const fbq = this.window['fbq'];
        if (isPlatformBrowser(this.platformId) && fbq && this.fbqLoaded) {
            fbq('track', 'PageView');
        } else {
            this.pixelQueue.push({
                url: this.Router.url
            });
        }
    }

    onLoadPixel(f: IObjectKeys, b: IObjectKeys, e: string, v: string, n?: IObjectKeys, t?: IObjectKeys, s?: IObjectKeys) {

        if (f.fbq) return; n = f.fbq = function () {
            n?.callMethod ?
                n?.callMethod.apply(n, arguments) : n?.queue.push(arguments)
        };

        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); if (t) t.async = !0;
        if (t) t.src = v; s = b.getElementsByTagName(e)[0];
        s?.parentNode.insertBefore(t, s);
        if (t) t.onload = this.initPixel.bind(this);

    }

    initPixel() {
        const fbq = this.window['fbq'];
        this.fbqLoaded = true;
        if (fbq) {
            fbq('init', this.pixelId);

            if (this.pixelQueue.length > 0) {

                for (var i = this.pixelQueue.length - 1; i >= 0; i--) {
                    this.setPixelEvent();
                    this.pixelQueue.splice(i, 1);
                }

            }
        }

    }

    onLoadGTAG() {

        if (document.getElementById('gtagID')) {
            return;
        }

        let js: any = document.createElement('script');
        js.id = 'gtagID';
        js.src = `//www.googletagmanager.com/gtag/js?id=${this.googleID}`;
        js.async = true;
        js.defer = true;

        document.head.appendChild(js);
        js.onload = this.initGTAG.bind(this);
    }

    initGTAG() {
        const w: IObjectKeys = this.window;
        w.dataLayer = w.dataLayer ?? [];
        w.gtag = function () { w.dataLayer.push(arguments); }

        w.gtag('js', new Date());
        w.gtag('config', this.googleID, {
            'page_title': this.Title.getTitle(),
            'page_path': this.Router.url
        });

        this.Router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                w.gtag('config', this.googleID, {
                    'page_title': this.Title.getTitle(),
                    'page_path': event.urlAfterRedirects
                });

            }
        });

    }

}

