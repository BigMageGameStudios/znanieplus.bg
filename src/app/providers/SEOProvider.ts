import { Injectable, Inject } from '@angular/core';
import { Meta, Title, } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class SEOProvider {

    canonicalURL: HTMLLinkElement;
    url = 'https://www.kvadratenmetar.bg'

    constructor(
        private Meta: Meta,
        private Title: Title,
        @Inject(DOCUMENT) private document
    ) {
        this.canonicalURL = this.document.querySelector("link[rel='canonical']")
    }

    set({ title, description, keywords, canonicalURL, ogUrl, ogType, ogDescription, ogImage }) {
        this.Meta.updateTag({
            content: description || ''
        },
            "property='description'"
        );
        this.Meta.updateTag({
            content: keywords || ''
        },
            "property='keywords'"
        );
        this.Meta.updateTag({
            content: ogUrl || ''
        },
            "property='og:url'"
        );
        this.Meta.updateTag({
            content: ogType || ''
        },
            "property='og:type'"
        );
        this.Meta.updateTag({
            content: title || ''
        },
            "property='og:title'"
        );
        this.Meta.updateTag({
            content: ogDescription || ''
        },
            "property='og:description'"
        );
        this.Meta.updateTag({
            content: ogImage || ''
        },
            "property='og:image'"
        );

        this.Title.setTitle(title || '');
        this.setCanonicalURL(canonicalURL);
    }

    setCanonicalURL(url) {
        this.canonicalURL.href = `${this.url}${url}`
    }

}
