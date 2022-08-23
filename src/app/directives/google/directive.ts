import { Directive, HostListener, Inject } from '@angular/core';
import { WINDOW } from 'src/app/modules/window';

@Directive({
    selector: '[google]'
})

export class GoogleDirective {

    readonly scope = 'profile openid email';
    readonly state = 'application';
    readonly apiKey = 'AIzaSyCtgQ5ZZ0sRxxPRArYmX3728AYPLTIY5bo';
    readonly clientId = '138967138525-8d88nlv7njopav9bljk4sf8po61n10k5.apps.googleusercontent.com';

    constructor(
        @Inject(WINDOW) private window: Window,
    ) { }

    @HostListener('click') onClick() {
        const url = this.window.location.pathname;
        const redirect = `${this.window.location.origin}/authentication/google`;

        const state = url ? `param==${this.state},redirect==${encodeURIComponent(url)}` : `param==${this.state}`;
        this.window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${this.clientId}&scope=${this.scope}&redirect_uri=${redirect}&state=${state}&nonce=${Date.now()}`;
    }

}