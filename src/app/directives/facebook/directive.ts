import { Directive, HostListener, Inject } from '@angular/core';
import { WINDOW } from 'src/app/modules/window';

@Directive({
    selector: '[facebook]'
})

export class FacebookDirective {

    readonly appId = '1030516030994887';
    readonly version = 'v14.0';
    readonly state = 'application';

    constructor(
        @Inject(WINDOW) private window: Window,
    ) { }

    @HostListener('click') onClick() {
        const url = this.window.location.pathname;
        const redirect = `${this.window.location.origin}/authentication/facebook`;

        const state = url ? `param==${this.state},redirect==${url}` : `param==${this.state}`;
        this.window.location.href = `https://www.facebook.com/${this.version}/dialog/oauth?client_id=${this.appId}&redirect_uri=${redirect}&state=${state}&scope=public_profile,email`;
    }

}